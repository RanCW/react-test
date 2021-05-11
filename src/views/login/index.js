import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
// function LoginPage(){
//    return (
//      <div>
//        这里是登陆页面
//      </div>
//    )
//  }

 class LoginPage extends React.Component{
   constructor (props) {
    super(props)
   }
   render(){
     return (
       <div>这里是我的登陆页面
         <button onClick={this.handleClick}>点击设置token</button>
         <div>这里要显示的内容{this.props.token}</div>
         <div>
           <Link to="/list">list</Link>
         </div>
       </div>
     )
   }
   handleClick = () => {
     console.log(this.props.token);
    console.log('haha');
    this.props.setToken(!this.props.token)
    console.log('she',this.props.token);
   }
 }
function setToken(value) {
  // action
  return { type: "SET_TOKEN",value };
}
function mapStateToProps(state){
  return {
    token:state.login.token
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({setToken},dispatch)
}
const ConnectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

 export default ConnectedLoginPage