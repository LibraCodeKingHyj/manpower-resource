<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <!-- el-checkbox-group选中的是 当前用户所拥有的角色  需要绑定 当前用户拥有的角色-->
    <el-checkbox-group v-model="roleIds">
      <!-- 选项 -->
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>
<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      list: [], // 所有角色
      roleIds: [] // 所拥有的角色
    }
  },
  methods: {
    async getRoleList() {
      const { total } = await getRoleList()
      const { rows } = await getRoleList({ page: 1, pagesize: total })
      this.list = rows
    },
    // props是异步传值，所以这里不能用this.userId
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds
    },
    async btnOk() {
      await assignRoles({ id: this.userId, roleIds: this.roleIds })
      this.$emit('update:showRoleDialog')
      this.$message.success('角色更新成功')
    },
    btnCancel() {
      this.$emit('update:showRoleDialog', false)
      this.roleIds = [] // 清空原来的数组
    }
  }
}
</script>
