<template>
  <el-dialog :visible="showDialog" title="新增员工">
    <el-form label-width="120px" :model="formData" :rules="rules">
      <el-form-item style="width:50%" label="姓名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item style="width:50%" label="手机" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输入手机" />
      </el-form-item>
      <el-form-item style="width:50%" label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item style="width:50%" label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" placeholder="请选择聘用形式" />
      </el-form-item>
      <el-form-item style="width:50%" label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item style="width:50%" label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" placeholder="请输入部门" @focus="getDepartments" />
        <el-tree v-if="showTree" v-loading="loading" :data="treeData" :props="{label:'name'}" :default-expand-all="true" />
      </el-form-item>
      <el-form-item style="width:50%" label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- 底部插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small">取消</el-button>
          <el-button type="primary" size="small">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>

</template>

<script>
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      treeData: [],
      showTree: false,
      loading: false
    }
  },
  methods: {
    async getDepartments() {
      this.showTree = true
      this.loading = true
      const { depts } = await getDepartments()
      this.treeData = tranListToTreeData(depts, '')
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
