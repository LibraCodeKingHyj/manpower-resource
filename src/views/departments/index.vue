<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <TreeTools :tree-node="company" :is-root="true" />
        <el-tree :data="departs" :props="defaultProps">
          <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
          <template v-slot="{data}">
            <TreeTools :tree-node="data" />
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加弹层 -->
    <add-dept :dialog-visible="showDialog" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import AddDept from './components/add-dept.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      company: { },
      showDialog: false,
      node: null
    }
  },
  created() {
    this.getDepartments() // 调用自身的方法
  },
  mounted() {
    this.$bus.$on('delDepts', () => {
      this.getDepartments()
    })
    this.$bus.$on('addDept', (node) => {
      this.showDialog = true
      this.node = node
    })
  },
  methods: {
    // 获取部门列表
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人' }
      this.departs = tranListToTreeData(result.depts, '') // 需要将其转化成树形结构
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
