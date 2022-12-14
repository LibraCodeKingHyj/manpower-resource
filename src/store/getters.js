const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // token的快捷访问
  name: state => state.user.userInfo.username,
  staffPhoto: state => state.user.userInfo.staffPhoto, // 头像快捷访问
  companyId: state => state.user.userInfo.companyId,
  routes: state => state.permission.routes
}
export default getters
