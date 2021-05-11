const initState = {
  list:'',//登陆后的token
}

const listReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_LIST":
      return Object.assign({},{...state},{list:action.value})
      break;
    default:
      break;
  }
  return state;
}

export default listReducer;