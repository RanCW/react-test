const initState = {
  token:'123',//登陆后的token
}

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return Object.assign({},{...state},{token:action.value})
      break;
    default:
      break;
  }
  return state;
}

export default loginReducer;