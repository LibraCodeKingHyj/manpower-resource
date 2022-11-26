<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width: 100%">
    <el-col>
      <!-- 名称应该变成 对应的节点中的name -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="operateDepts">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDpartments } from '@/api/departments'
export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    operateDepts(type) {
      switch (type) {
        case 'add':
          this.$bus.$emit('addDept', this.treeNode)
          break
        case 'edit':
          // 编辑
          this.$bus.$emit('editDepts', this.treeNode)
          break
        case 'del':
          this.$confirm('你确定删除该部门组织吗').then(() => {
            return delDpartments(this.treeNode.id)
          }).then(() => {
            // 删除成功重新获取
            this.$bus.$emit('delDepts')
            this.$message({ message: '删除成功', type: 'success' })
          })
      }
    }
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>
