/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const CreateTodo = ({ fetchTodos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleCreate() {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:3000/user/createtodo",
        {
          title: title,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setTitle("");
        setDescription("");
        fetchTodos();
      });
  }

  return (
    <div className="border rounded-lg m-5 p-5 flex flex-col w-full">
      <div>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          className="w-full font-semibold outline-none placeholder:font-semibold"
          placeholder="Task Name"
        ></input>
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full text-sm mt-2 outline-none"
          placeholder="Description"
        ></input>
      </div>

      <div className="flex self-end">
        <button
          onClick={handleCreate}
          className="border right- p-2 bg-red-500 text-white rounded-lg text-xs mr-10"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default CreateTodo;
