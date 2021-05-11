import  LoginPage from './views/login/index.js'
import  ListPage from './views/list/index.js'
import  DetailPage from './views/list/index.js'
const routerCofig = [
  {
    path:'/login',
    auth:false,
    component:LoginPage
  },
  {
    path:'/list',
    auth:true,
    component:ListPage
  },
  {
    path:'/detail',
    auth:true,
    component:DetailPage
  },
]

export default routerCofig