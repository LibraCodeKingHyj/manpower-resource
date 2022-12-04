<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <el-card>
        <el-row type="flex" justify="end">
          <el-button type="primary" size="small" @click="addPerm(1,'0')">新增权限</el-button>
        </el-row>
      </el-card>
      <!-- 表格 -->
      <el-table :data="list" row-key="id" border="">
        <el-table-column label="名称" prop="name" />
        <el-table-column label="标识" prop="code" align="center" />
        <el-table-column label="描述" prop="description" align="center" />
        <el-table-column label="操作" align="center">
          <template v-slot="{row}">
            <el-button type="text" @click="addPerm(2,row.id)">添加</el-button>
            <el-button type="text" @click="editPerm(row.id)">编辑</el-button>
            <el-button type="text" @click="delPerm(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增弹层 -->
      <el-dialog title="编辑" :visible="showDialog" @close="btnCancel">
        <el-form ref="perForm" label-width="120px" :rules="rules" :model="formData">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-row type="flex" justify="center">
            <el-button size="small" type="primary" @click="btnOk">确定</el-button>
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-row>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissionList, delPermission, getPermissionDetail, updatePermission, addPermission } from '@/api/permission'
export default {
  data() {
    return {
      list: [],
      showDialog: false,
      formData: {
        name: '',
        code: '',
        description: '',
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0'
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    trantree(list, id) {
      const arr = []
      list.forEach(item => {
        if (item.pid === id) {
          const children = this.trantree(list, item.id)
          if (children.length) {
            item.children = children
          }
          arr.push(item)
        }
      })
      return arr
    },
    async getPermissionList() {
      this.list = this.trantree(await getPermissionList(), '0')
    },
    async editPerm(id) {
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    },
    delPerm(id) {
      this.$confirm('确定删除吗？').then(async() => {
        await delPermission(id)
        this.$message.success('删除成功')
        await this.getPermissionList()
      }).catch((error) => {
        console.log(error)
      })
    },
    addPerm(type, id) {
      this.showDialog = true
      this.formData.pid = id
      this.formData.type = type
    },
    async btnOk() {
      if (this.formData.id) {
        await updatePermission(this.formData)
      } else {
        await addPermission(this.formData)
      }
      this.$message.success('操作成功')
      this.getPermissionList()
      this.showDialog = false
    },
    btnCancel() {
      this.formData = {
        name: '',
        code: '',
        description: '',
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0'
      }
      this.$refs.perForm.resetFields()
      this.showDialog = false
    }
  }
}
</script>

<style scoped>

</style>
