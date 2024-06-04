/* eslint-disable react/prop-types */
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { FiEdit3 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

const MyTodos = ({ todos, fetchTodos }) => {
  return (
    <div className="w-full">
      {todos.map((item) => (
        <Todo key={item._id} details={item} fetchTodos={fetchTodos} />
      ))}
    </div>
  );
};

const Todo = ({ details, fetchTodos }) => {
  const { title, description, completed } = details;

  const [underEdit, setUnderEdit] = useState(false);
  const [title2, setTitle] = useState(title);
  const [description2, setDescription] = useState(description);

  async function markCompleted() {
    const token = localStorage.getItem("token");
    await axios.put(
      "http://localhost:3000/user/update",
      {
        id: details._id,
        title: title,
        description: description,
        completed: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchTodos();
  }

  async function handleDelete() {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:3000/user/delete",
      {
        id: details._id,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    fetchTodos();
  }

  async function handleUpdate() {
    const token = localStorage.getItem("token");
    await axios.put(
      "http://localhost:3000/user/update",
      {
        id: details._id,
        title: title2,
        description: description2,
        completed: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUnderEdit(false);
    fetchTodos();
  }

  if (!completed && !underEdit) {
    return (
      <div className="group border rounded-lg m-5 flex flex-row  w-full justify-between items-center overflow-hidden p-5">
        <div
          onClick={markCompleted}
          className="border border-black h-6 w-6 rounded-full flex justify-center items-center"
        >
          <TiTick className="hover:opacity-100  opacity-0" />
        </div>
        <div className="flex flex-col">
          <div>{title}</div>
          <div>{description}</div>
        </div>
        <div className="text-2xl gap-2 flex flex-row  opacity-0  group-hover:opacity-100">
          <FiEdit3 onClick={() => setUnderEdit(true)} />
          <MdDelete onClick={handleDelete} />
        </div>
      </div>
    );
  } else if (!completed && underEdit) {
    return (
      <div className="border rounded-lg m-5 p-5 flex flex-col w-full">
        <div>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title2}
            type="text"
            className="w-full font-semibold outline-none placeholder:font-semibold"
            placeholder="Task Name"
          ></input>
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description2}
            className="w-full text-sm mt-2 outline-none"
            placeholder="Description"
          ></input>
        </div>

        <div className="flex self-end">
          <button
            className="border p-2 rounded-lg text-xs mr-10"
            onClick={() => setUnderEdit(false)}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="border right- p-2 bg-red-500 text-white rounded-lg text-xs mr-10"
          >
            Save
          </button>
        </div>
      </div>
    );
  } else return <div></div>;
};

export default MyTodos;
