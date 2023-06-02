const initialState = {
  list: [],
};
const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Addtodo":
      const { id, data } = action.payload;
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: id,
            data: data,
          },
        ],
      };

    case "Deletetodo":
      const newList = state.list.filter((value) => value.id !== action.id);
      return {
        ...state,
        list: newList,
      };
    case "removetodo":
      const incompleteTasks = state.list.filter((value) => !value.checked);
      return {
        ...state,
        list: incompleteTasks,
      };
    case "check":
      const updatedList = state.list.map((task) =>
        task.id === action.id ? { ...task, checked: !task.checked } : task
      );
      return {
        ...state,
        list: updatedList,
      };
    case "setlist":
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

export default TodoReducer;
