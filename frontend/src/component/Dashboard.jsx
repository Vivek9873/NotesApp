import React, { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import dashboardImg from "../assets/dashboard_top.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { setUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const Dashboard = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [notes, setNotes] = useState([]);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const result = await axios.get(BASE_URL + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result.data);
      dispatch(setUser(null));
      setLoading(false);
      toast.success(result.data.message);
      navigate("/login");
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.success(e.response.data.message);
    }
  };

  const handleCreateNote = async () => {
    setLoadingCreate(true);
    try {
      const result = await axios.post(
        BASE_URL + "/api/notes/createnote",
        {
          title: `Note ${notes.length + 1}`,
          content: "New Note",
          creator: user._id,
        },
        { withCredentials: true }
      );
      console.log(result);
      fetchUser();
      setLoadingCreate(false);
      toast.success(result.data.message);
    } catch (e) {
      console.log(e);
      setLoadingCreate(false);
      toast.success(e.response.data.message);
    }
  };

  const handleDelete = async (noteId) => {
    console.log(noteId);
    setLoadingDelete(true);
    try {
      const result = await axios.post(
        BASE_URL + "/api/notes/deletenotes",
        { noteId },
        { withCredentials: true }
      );
      fetchUser();
      setLoadingDelete(false);
      toast.success(result.data.message);
    } catch (e) {
      console.log(e);
      setLoadingDelete(false);
      toast.error(e.response.data.message);
    }
  };

  const fetchUser = async () => {
    try {
      const result = await axios.get(BASE_URL + "/api/user/getuser", {
        withCredentials: true,
      });
      console.log(result.data);
      dispatch(setUser(result.data.data));
      setNotes(result.data.data.notes);
    } catch (e) {
      console.log(e);
      navigate("/login");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-12 h-8 ">
            <img src={dashboardImg} alt="" />
          </div>
          <span className="font-medium">Dashboard</span>
        </div>
        <button
          onClick={handleSignOut}
          className="text-blue-600 font-medium hover:underline"
        >
          {loading ? <ClipLoader size={30} color="blue" /> : "Sign Out"}
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Welcome Card */}
        <div className="bg-white shadow rounded-lg p-4 mb-4">
          <h2 className="text-lg font-semibold">Welcome, {user?.name} !</h2>
          <p className="text-gray-500 text-sm">Email: {user?.email}</p>
        </div>

        {/* Create Note Button */}
        <button
          disabled={loadingCreate}
          onClick={handleCreateNote}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition mb-4"
        >
          {loadingCreate ? (
            <ClipLoader size={30} color="white" />
          ) : (
            "Create Note"
          )}
        </button>

        {/* Notes List */}
        <div>
          <h3 className="font-semibold mb-2">Notes</h3>
          <div className="space-y-2">
            {notes.map((note) => (
              <div
                onClick={() => navigate("/notes/" + note._id)}
                key={note._id}
                className="flex justify-between items-center bg-white shadow rounded-lg p-3 cursor-pointer"
              >
                <span>{note?.title}</span>
                <button
                  disabled={loadingDelete}
                  onClick={() => handleDelete(note?._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  {loadingCreate ? (
                    <ClipLoader size={30} color="red" />
                  ) : (
                    <FaRegTrashCan size={18} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
