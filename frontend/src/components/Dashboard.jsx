import { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo";
import MyTodos from "./MyTodos";
import axios from "axios";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/user/mytodos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTodos(response.data.mytodos);
  }

  return (
    <div className=" mx-auto items-center w-[min(100%,500px)]">
      <CreateTodo fetchTodos={fetchTodos} />
      <MyTodos todos={todos} fetchTodos={fetchTodos} />
    </div>
  );
};

export default Dashboard;
