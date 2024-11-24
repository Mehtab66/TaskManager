import React, { useState } from "react";
import "./NewTask.css";

export const NewTask = () => {
  const [Formdata, setFormdata] = useState({
    title: "",
    description: "",
    status: "Pending",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...Formdata, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Formdata),
      });
      console.log("hello ths is form data", Formdata);
      const data = await response.json();
      if (response.status === 201) {
        alert("Task created successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="text-center font-bold text-5xl mb-20 text-white mt-5">
        Add New Task
      </h1>

      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="p-12 w-[390px] bg-gray-900 rounded-lg shadow-lg"
          action=""
        >
          <div className="mb-6">
            <label className="font-bold text-white block mb-2">
              Enter Title
            </label>
            <input
              name="title"
              onChange={handleChange}
              required
              placeholder="University Task"
              className="bg-slate-800 text-white border border-gray-600 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              type="text"
            />
          </div>
          <div className="mb-6">
            <label className="font-bold text-white block mb-2">
              Enter Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              placeholder="Task Description"
              className="bg-slate-800 text-white border border-gray-600 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              rows="4"
            />
          </div>
          <div className="mb-6">
            <label className="font-bold text-white block mb-2">
              Select Status
            </label>
            <select
              name="status"
              onChange={handleChange}
              required
              className="bg-slate-800 text-white border border-gray-600 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            >
              <option value="Pending">Todo</option>
              <option value="In-Progress">In Progress</option>
              <option value="Completed">Done</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold p-2 rounded-lg w-[320px] mt-5 transition-all shadow-lg hover:shadow-xl"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
