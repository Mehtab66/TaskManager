import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditTask = () => {
  const navigate = useNavigate();
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        alert("Task updated successfully");
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
  });
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTask(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="text-white text-6xl font-bold flex justify-center">
        Edit Task
      </div>
      <div className="flex justify-center mt-[33px]">
        <form
          className="p-12 w-[390px] bg-gray-900 rounded-lg shadow-lg"
          action=""
        >
          <label className="block text-white font-bold" htmlFor="title">
            Title
          </label>
          <input
            className="bg-slate-800 text-white border border-gray-600 p-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
          />

          <label className="block font-bold text-white" htmlFor="description">
            Description
          </label>
          <textarea
            className="bg-slate-800 text-white border border-gray-600 p-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            name="description"
            value={task.description}
            onChange={handleChange}
          ></textarea>

          <label className="block font-bold text-white" htmlFor="status">
            Status
          </label>
          <select
            className="bg-slate-800 text-white border border-gray-600 p-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <button
            onClick={handleUpdate}
            className=" block bg-purple-700 text-white rounded-lg p-2 mt-5 transition-all shadow-lg hover:shadow-xl  "
            type="submit"
          >
            Update Task
          </button>
        </form>
      </div>
    </>
  );
};
