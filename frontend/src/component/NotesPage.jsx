import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants.js";
import axios from "axios";

import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { setUser } from "../utils/userSlice";

function NotesPage() {
  const { notesId } = useParams();

  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  console.log(user?.notes);

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEditNote = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        BASE_URL + `/api/notes/editnotes/${notesId.toString()}`,
        { title, content },
        { withCredentials: true }
      );
      console.log(result.data);
      toast.success("Note Updated");
      navigate("/dashboard");
      setLoading(false);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const result = await axios.get(BASE_URL + "/api/user/getuser", {
        withCredentials: true,
      });
      console.log(result.data);
      dispatch(setUser(result.data.data));
      // setNotes(result.data.data.notes);
      const selectedNote = result.data.data?.notes.find(
        (note) => note?._id.toString() === notesId.toString()
      );
      if (!selectedNote) navigate("/dashboard");
      console.log(selectedNote, "seleted hai");
      setTitle(selectedNote?.title || "");
      setContent(selectedNote?.content || "");
    } catch (e) {
      console.log(e);
      navigate("/login");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className=" min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className=" w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* header  */}
        <div className=" flex items-center gap-2 mb-2">
          <FaArrowLeftLong
            onClick={() => navigate(`/dashboard}`)}
            className=" text-gray-600 cursor-pointer"
          />
          <h2 className="text-xl font-semibold text-gray-800  ">Edit Note</h2>
        </div>

        <div className="space-y-4 ">
          <div>
            <label
              htmlFor=""
              className=" block text-sm font-medium text-gray-700 mb-1"
            >
              Note Title *
            </label>
            <input
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              className=" w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor=""
              className=" block text-sm font-medium text-gray-700 mb-1"
            >
              Note Content
            </label>
            <textarea
              name="content"
              rows={3}
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className=" w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-white hover:file:bg-gray-500"
            />
          </div>
        </div>
        <div className="pt-4 ">
          <button
            onClick={handleEditNote}
            disabled={loading}
            className=" w-full bg-blue-500 text-white py-1 rounded-md text-sm font-medium hover:bg-gray-700 transition"
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Update Note"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotesPage;
