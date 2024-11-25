import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const MainPage = () => {
  const [data, setData] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null); // Track the task to delete

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      alert("Task deleted successfully!");
      setData(data.filter((task) => task._id !== taskId)); // Update state to remove the deleted task
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete);
      setShowDialog(false); // Close the dialog after deletion
    }
  };

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
      <div className="overflow-x-auto  mt-5 mx-[400px] border border-gray-300 shadow-lg rounded-lg">
        <table className="table-auto w-full text-left text-sm">
          <thead className="bg-gray-200 text-gray-700 uppercase font-semibold">
            <tr>
              <th className="px-4 py-2 border">Sr#</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Status</th>

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

                  <td className="px-4 py-2 border">{task.status || "N/A"}</td>

                  <td className="px-4 py-2 block m-1">
                    <Link
                      to={`/editTask/${task._id}`}
                      className="bg-blue-500 text-white p-2 rounded-lg px-4 hover:bg-blue-700 transition duration-300"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        setTaskToDelete(task._id); // Set the task to delete
                        setShowDialog(true); // Show confirmation dialog
                      }}
                      className="bg-red-500 text-white p-2 rounded-lg px-4 hover:bg-red-700 ml-2 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center px-4 py-2 border bg-gray-100"
                >
                  No tasks available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Dialog */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p className="text-gray-600 my-4">
              Are you sure you want to delete this task?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDelete} // Trigger delete
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDialog(false)} // Close the dialog
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
