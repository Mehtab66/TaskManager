import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const MainPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const dataFetched = await response.json();
        setData(dataFetched); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1 className="mt-10 text-7xl font-bold font-serif align-bottom text-center">
        Task Manager
      </h1>
      <div className="flex justify-center mt-5">
        <Link
          to="/addNewTask"
          className="bg-black text-xl text-white p-2 rounded-lg px-20 hover:bg-purple-700 transition duration-300"
        >
          Add New Task
        </Link>
      </div>
      <div>
        <h2 className="w-48 ml-5 mt-10 rounded-2xl p-3 text-white bg-purple-900 text-4xl font-bold">
          All Tasks
        </h2>
      </div>
      <div className="overflow-x-auto mt-5 mx-[400px] border border-gray-300 shadow-lg rounded-lg">
        <table className="table-auto w-full text-left text-sm">
          <thead className="bg-gray-200 text-gray-700 uppercase font-semibold">
            <tr>
              <th className="px-4 py-2 border">Sr#</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((task, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } hover:bg-purple-100 transition duration-200`}
                >
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{task.title || "N/A"}</td>
                  <td className="px-4 py-2 border">
                    {task.description || "N/A"}
                  </td>
                  <td className="px-4 py-2 block m-1">
                    <Link
                      to={`/editTask/${task._id}`}
                      className="bg-blue-500 text-white p-2 rounded-lg px-4 hover:bg-blue-700 transition duration-300"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/editTask/${task._id}`}
                      className="bg-red-500 text-white p-2 rounded-lg px-4 hover:bg-red-700 ml-2  transition duration-300"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center px-4 py-2 border bg-gray-100"
                >
                  No tasks available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
