<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="deptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 80%"
          placeholder="请选择"
          @focus="getEmployeeSimple"
        >
          <el-option v-for="item in people" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click.native="btnOk">确定</el-button>
        <el-button size="small" @click.native="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getDepartments, addDpartments, getDepartDetail, updateDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default ({
  props: {
    showDialog: {
      type: Boolean
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    const checkNameRepeat = async(rule, value, callback) => {
      // value 是部门名称
      const { depts } = await getDepartments()
      let isRepeat = false
      // 获取最新数据
      if (this.formData.id) {
        // 编辑模式 同级部门下我的名字不能和其他的同级部门名字进行重复
        // depts.filter(item => item.pid === this.formData.pid)
        isRepeat = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id).some(item => item.name === value)
      } else {
        // 去找同级部门下，有没有相同的
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }

      // 找到一样的名字
      isRepeat ? callback(new Error(`同级部门下已经存在${value}部门了`)) : callback()
    }
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        // 编辑模式  因为编辑模式下 不能算自己
        isRepeat = depts.some(item => item.id !== this.formData.id && item.code === value && value)
      } else {
        // 新增模式
        isRepeat = depts.some(item => item.code === value && value) // 这里加一个 value不为空 因为我们的部门有可能没有code
      }
      isRepeat ? callback(new Error(`组织架构下已经存在${value}编码了`)) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称长度为1-50个字符', trigger: 'blur' },
          // 同级部门不能重复
          { trigger: 'blur', validate: checkNameRepeat }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码长度为1-50个字符', trigger: 'blur' },
          // 所有部门的编码不能重复
          { trigger: 'blur', validate: checkCodeRepeat }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍长度为1-300个字符', trigger: 'blur' }
        ]
      },
      people: []
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑' : '新增部门'
    }
  },
  methods: {
    btnOk() {
      this.$refs.deptForm.validate(async(isOk) => {
        if (isOk) {
          // 根据当前有没有id判断是编辑还是新增
          if (this.formData.id) {
            await updateDepartments(this.formData)
            this.$message.success('信息更新成功')
          } else {
            // 将这个pid设置为点击节点的id
            await addDpartments({ ...this.formData, pid: this.treeNode.id })
            // this.$refs.deptForm.resetFields()// 重置表单
            this.$message.success('新增部门成功')
          }
          this.$bus.$emit('addDepts') // 让父组件获取最新数据
          this.$emit('update:showDialog', false) // 关闭弹窗 会触发el-dialog的close事件 ，所以不需要重置数据
        }
      })
    },
    // 需要监听el-dialog的close事件，所以才能点击❌
    btnCancel() {
      // 重置数据  因为resetFields 只能重置 表单上的数据 非表单上的 比如 编辑中id 不能重置
      // 所以在取消的位置需要强制加上 重置数据
      // 方法一
      // this.formData = {
      //   name: '',
      //   code: '',
      //   manager: '',
      //   introduce: ''
      // }
      // 方法二
      this.$delete(this.formData, 'id')
      this.$refs.deptForm.resetFields()
      this.$emit('update:showDialog', false)
    },
    // 简单员工信息列表
    async getEmployeeSimple() {
      this.people = await getEmployeeSimple()
    },
    // 获取详情
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
    }
  }
})
</script>
