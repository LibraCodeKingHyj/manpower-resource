<template>
  <div>
    <el-upload
      :class="{disabled: fileComputed }"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changefile"
      :limit="1"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="showDialog" title="预览">
      <img width="100%" :src="imgUrl" alt="">
    </el-dialog>
    <el-progress v-if="showPercent" style="width: 180px" :percentage="percent" />
  </div>
</template>
<script type="text/javascript" >
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDlUnolibPCP3YCh3NekhT0LWZdnxw4zkJ',
  SecretKey: 'uiMqMpHcovr472seEfw3xi8QaaUEk3DC'
})
export default {
  data() {
    return {
      fileList: [], // 图片地址设置为数组
      showDialog: false, // 控制显示弹层
      imgUrl: '',
      currentFileUid: null, // 记录上传的uid
      percent: 0, // 当前百分比
      showPercent: false // 默认不显示进度条
    }
  },
  computed: {
    // 限制只上传一个 当有一个
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      // 这里应该弹出一个层 层里是点击的图片地址
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove(file, fileList) {
      // file是点击删除的文件
    //   将原来的文件给排除掉了 剩下的就是最新的数组了
      // this.fileList = this.fileList.filter(item => item.uid !== file.uid)
      this.fileList = fileList
    },
    changefile(file, fileList) {
      this.fileList = fileList
    },
    beforeUpload(file) {
      console.log(file)
      const types = ['image/jpeg', 'image/gif', 'image/jpg', 'image/png']
      // 检查文件类型
      if (!types.includes(file.type)) {
        this.$message.error('上传格式错误')
        return false
      }
      // 检查文件大小 1M = 1024kb
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('文件过大')
        return false
      }
      this.currentFileUid = file.uid
      this.showPercent = true
      return true
    },
    upload(params) {
      // 上传文件
      // const form = new FormData()
      // form.append({})
      if (params.file) {
        cos.putObject({
          Bucket: 'caixukun-1315519094', // 存储桶名称
          Region: 'ap-nanjing', // 存储桶地狱名称
          Key: params.file.name, // 文件名
          Body: params.file, // 要上传的文件对象
          StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
          // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
          onProgress: (params) => {
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          // data返回数据之后 应该如何处理
          // data 里面有一个statusCode===200的时候说明上传成功
          console.log(err || data)
          if (!err && data.statusCode === 200) {
            this.fileList.forEach(item => {
              // 找到相同的uid 就将他的url改变并
              if (item.uid === this.currentFileUid) {
                item.url = `http://${data.Location}`
                item.upload = true
                item.status = 'success'
              }
            })
            setTimeout(() => {
              this.showPercent = false // 隐藏进度条
              this.percent = 0 // 进度归0
            }, 1000)
          }
        })
      }
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none
}
</style>
