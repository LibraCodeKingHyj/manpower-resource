<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-row type="flex" justify="space-between" align="middle">
          <el-col>
            <el-input v-model="searchStr" placeholder="搜索" style="width:200px;margin-right:10px" size="small" />
            <el-button type="primary" size="small" @click="search">搜索</el-button>
            <el-button size="small" @click="reset">重置数据</el-button>
            <el-button type="danger" size="small" @click="delSel">删除已选中</el-button>
          </el-col>
          <el-col>
            <el-row type="flex" justify="end">
              <el-button type="success" size="small">导入excel</el-button>
              <el-button type="danger" size="small" @click="exportinfo">导出excel</el-button>
              <el-button type="primary" size="small" @click="add">新增组员</el-button>
            </el-row>
          </el-col>
        </el-row>
        <el-table :data="showInfo" @select="change">
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="120" />
          <el-table-column prop="name" label="姓名" width="120" />
          <el-table-column prop="gender" label="性别" width="120" />
          <el-table-column prop="age" label="年龄" width="120" />
          <el-table-column prop="mobile" label="手鸡号" width="120" />
          <el-table-column>
            <template v-slot="{row}">
              <el-button type="success" size="small" @click="edit(row.id)">编辑</el-button>
              <el-button type="danger" size="small" @click="del(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-dialog :title="showTitle" :visible="showDialog" center @close="btnCancel">
        <el-form ref="form" label-width="120px" :model="form">
          <el-form-item label="姓名" :rules="rules">
            <el-input v-model="form.name" style="width:300px" />
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.gender" style="width:300px" />
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age" style="width:300px" />
          </el-form-item>
          <el-form-item label="手鸡号">
            <el-input v-model="form.mobile" style="width:300px" />
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="btnCancel">取 消</el-button>
          <el-button type="primary" @click="isOk">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash'
export default {
  data() {
    return {
      info: [
        { id: '1', name: '胡英俊', gender: '男', age: 18, mobile: '18023162175', isSel: false },
        { id: '2', name: '高卓军', gender: '男', age: 18, mobile: '18023162175', isSel: false },
        { id: '3', name: '胡彦强', gender: '男', age: 18, mobile: '18023162175', isSel: false },
        { id: '4', name: '武壮', gender: '男', age: 18, mobile: '18023162175', isSel: false },
        { id: '5', name: '伍兆轩', gender: '男', age: 18, mobile: '18023162175', isSel: false },
        { id: '6', name: '曹宏军', gender: '男', age: 18, mobile: '18023162175', isSel: false }
      ],
      form: {},
      showDialog: false,
      showTitle: '新增',
      rules: {
        name: [
          { required: true }
        ]
      },
      searchStr: '',
      showInfo: this.info
    }
  },
  computed: {
    filarr() {
      if (this.searchStr) {
        return this.info.filter((item) => {
          return item.name.indexOf(this.searchStr) !== -1
        })
      } else {
        return this.info
      }
    }
  },
  created() {
    this.showInfo = this.filarr
  },
  methods: {
    async del(id) {
      try {
        await this.$confirm('Are you sure you want to delete this member?')
        this.info = this.info.filter(item => item.id !== id)
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    edit(id) {
      this.showTitle = '编辑'
      this.showDialog = true
      this.form = this.info.filter(item => item.id === id)[0]
    },
    isOk() {
      if (this.form.id) {
        this.info.forEach(item => {
          if (item.id === this.form.id) {
            item = this.form
            this.$message.success('更新成功')
            this.showDialog = false
          }
        })
      } else {
        const id = this.info[this.info.length - 1].id + 1
        this.info.push({ ...this.form, id })
        this.showDialog = false
      }
    },
    btnCancel() {
      this.showDialog = false
      this.form = {}
      this.$refs.form.resetFields()
    },
    add() {
      this.showDialog = true
    },
    search() {
      this.showInfo = this.filarr
      this.searchStr = ''
    },
    change(selection, row) {
      row.isSel = !row.isSel
    },
    async delSel() {
      await this.$confirm('确定删除选中的人员吗')
      this.info = this.info.filter(item => item.isSel === false)
      this.$message.success('删除成功')
    },
    exportinfo() {
      const headers = {
        '姓名': 'name',
        '性别': 'gender',
        '年龄': 'age',
        '手鸡号': 'mobile'
      }
      const multiHeader = [['47期第九组人员信息', '', '', '']]
      const merges = ['A1:D1']
      const data = this.info.map(item => {
        return Object.values(headers).map(obj => {
          return item[obj]
        })
      })
      console.log(data)
      import('@/vendor/Export2Excel').then(async excel => {
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '🎤🕺🏀🐔',
          multiHeader, // 头部
          merges // 合并 从左到右直接覆盖
        })
      })
    },
    reset() {
      this.showInfo = this.info
    }
  }
}
</script>

<style>

</style>
