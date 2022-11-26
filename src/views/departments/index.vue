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
    <!-- sync相当于传入值的时候又传入了自定义事件@update事件 这个参数可以进行接收值对值进行修改 -->
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" />
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
      showDialog: false, // 添加弹窗
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
    this.$bus.$on('addDepts', () => {
      this.getDepartments()
    })
    this.$bus.$on('editDepts', (node) => {
      this.showDialog = true
      this.node = node
      console.log(this.$refs.addDept)
      this.$refs.addDept.getDepartDetail(node.id)
    })
  },
  methods: {
    // 获取部门列表
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' } // id为空解决头部无法判断有无根级部门
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
