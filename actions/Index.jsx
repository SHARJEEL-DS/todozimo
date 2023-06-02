export const addTodo=(data)=>
{
    return {
        type:"Addtodo",
        payload:{
            id: new Date().getTime().toString(),
            data:data
        }
    }
}
 

export const deleteTodo = (id) =>{
    return {
        type:"Deletetodo",
        id
    }
}

export const removeTodo = () => {
    return {
      type: "removetodo"
    };
  };

export const toggleTodoCheck = (id) => {
    return {
      type: "check",
      id
    };
  };
export const setTodoList = (list) => {
  return {
    type: "setlist",
    payload: list,
  };
};