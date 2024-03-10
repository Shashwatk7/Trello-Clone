import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Details() {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState({
    id: null,
    title: "",
    desc: "",
    type: ""
  });
  const [statusTypes, setStatusTypes] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch("api_endpoint_here");
        if (!response.ok) {
          throw new Error("Failed to fetch details");
        }
        const data = await response.json();
        const newDetail = data[type].find((item) => item.id === parseInt(id));
        if (!newDetail) {
          navigate("/notFound");
          return;
        }
        setDetail(newDetail);
        setStatusTypes(Object.keys(data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [id, type, navigate]);

  const handleChange = (key, value) => {
    setDetail({ ...detail, [key]: value });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("api_delete_endpoint_here"); // Replace "api_delete_endpoint_here" with your actual API delete endpoint
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch("api_save_endpoint_here", { // Replace "api_save_endpoint_here" with your actual API save endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(detail)
      });
      if (!response.ok) {
        throw new Error("Failed to save item");
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold mb-4 text-center pt-2 text-blue-800">Details Page</h1>
      <div className="w-full flex justify-center items-center">
        <div className="w-full md:w-[70vw] flex flex-col">
          <div className="w-full flex items-center justify-between mb-4">
            <select
              name="type"
              value={detail.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="border ring ring-gray-300 ring-offset-2 px-2 py-1 rounded"
            >
              {statusTypes.map((statusType) => (
                <option key={statusType} value={statusType}>
                  {statusType.charAt(0).toUpperCase() + statusType.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <label htmlFor="title" className="font-semibold pb-2">Title</label>
          <input
            type="text"
            id="title"
            value={detail.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="border ring ring-gray-300 ring-offset-2 px-2 py-1 rounded mb-4"
          />
          <label htmlFor="description" className=" font-semibold pb-2">Description</label>
          <textarea
            id="description"
            rows={5}
            value={detail.desc}
            onChange={(e) => handleChange("desc", e.target.value)}
            className="border ring ring-gray-300 ring-offset-2 px-2 py-1 rounded"
          />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row py-12 justify-center items-center space-y-5 md:space-y-0 md:space-x-5">
        <button onClick={()=>{navigate("/")}} className="border px-4 py-1 rounded bg-green-500 text-white ring ring-green-600 ring-offset-2">Home</button>
        <button onClick={handleSave} className="border px-4 py-1 rounded bg-blue-500 text-white ring ring-blue-600 ring-offset-2">Save</button>
        <button onClick={handleDelete} className="border px-4 py-1 rounded bg-red-500 text-white ring ring-red-600 ring-offset-2">Delete</button>
      </div>
    </div>
  );
}
