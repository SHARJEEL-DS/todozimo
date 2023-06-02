import React, { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import {GrFormClose} from 'react-icons/gr'
import {
  addTodo,
  deleteTodo,
  removeTodo,
  toggleTodoCheck,
  setTodoList
} from "../actions/Index";
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const list = useSelector((state) => state.TodoReducer.list);
  const dispatch = useDispatch();

  const handleForm = (e) => {
    e.preventDefault();
    dispatch(addTodo(inputData), setInputData(""));
    setInputData("");
  };

  const handleActiveFilter = () => {
    setActiveFilter("active");
  };
  const handleCompletedFilter = () => {
    setActiveFilter("completed");
  };
  const handleAllFilter = () => {
    setActiveFilter("all");
  };
  const handleClearCompleted = () => {
    dispatch(removeTodo());
  };
  
  useEffect(() => {
    const savedList = localStorage.getItem("todoList");
    if (savedList) {
      dispatch(setTodoList(JSON.parse(savedList)));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);
  const uncheckedTasksCount = list.filter((task) => !task.checked).length;

  return (
    <div className="  pt-[40px] grid sm:grid-cols-1 sm:px-2 grid-cols-3 ">
      <div></div>
      <div className="mt-52">
        <div>
          <p className="  text-[35px] font-bold tracking-[10px] sm:[15px] text-white ">
            todo
          </p>
        </div>
        <div className="bg-white rounded-[7px] ">
          <form onSubmit={handleForm} action="">
            <input
              type="text"
              placeholder="enter your todo task"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="w-[100%] pl-4 py-4 rounded-[13px]  "
            />
          </form>
        </div>
        <div className=" mt-[20px] rounded-[13px] bg-white">
          {list.map((value) => {
            if (activeFilter === "active" && value.checked) {
              return null;
            }
            if (activeFilter === "completed" && !value.checked) {
              return null;
            }
            if (activeFilter === "all") {
              return (
                <div
                  className="flex border-b-1 field rounded-[4px] border flex-row py-3  bg-white justify-between px-4"
                  key={value.id}
                >
                  <div
                    className={` flex  ${
                      value.checked ? "line-through text-gray-400  "   : ""
                    } `}
                  >
                    <input
                      className="mr-4"
                      type="checkbox"
                      value={value.data}
                      onChange={() => dispatch(toggleTodoCheck(value.id))}
                    />
                    <p className=" text-[18px] ">{value.data}</p>
                  </div>
                  <div>
                    <button
                      className="delete "
                      onClick={() => dispatch(deleteTodo(value.id))}
                    >
                      <GrFormClose/>
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div
                className="flex border-b-1 rounded-[4px] border flex-row py-3  bg-white justify-between px-4"
                key={value.id}
              >
                <div className="flex ">
                  <input
                    className="mr-4"
                    type="checkbox"
                    value={value.data}
                    onChange={() => dispatch(toggleTodoCheck(value.id))}
                  />
                  <p className=" text-[18px] ">{value.data}</p>
                </div>
                <div>
                  <button onClick={() => dispatch(deleteTodo(value.id))}>
                    <GrFormClose/>
                  </button>
                </div>
              </div>
            );
          })}
          <div className="flex flex-row justify-between px-2 py-3">
            <div>
              <p>
                {uncheckedTasksCount} item{uncheckedTasksCount !== 1 ? "s" : ""}{" "}
                left
              </p>
            </div>
            <div>
              {" "}
              <button
                className={activeFilter === "all" ? "text-[#6F96E2]" : ""}
                onClick={handleAllFilter}
              >
                All
              </button>
              <button
                className={
                  activeFilter === "active" ? "mx-4 text-[#6F96E2]" : "mx-4"
                }
                onClick={handleActiveFilter}
              >
                Active
              </button>
              <button
                onClick={handleCompletedFilter}
                className={activeFilter === "completed" ? "text-[#6F96E2]" : ""}
              >
                Completed
              </button>
            </div>
            <div>
              <button onClick={handleClearCompleted}>Clear Completed</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
