import React, { useState } from "react";
import AuthLogoImg from "../assets/right-column.png";
import topImg from "../assets/top.png";
import topMImg from "../assets/top_mobile.png";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { setUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
const Login = () => {
  const [isEnterOtp, setIsEnterOtp] = useState(false);
  const [isShowOtp, setIsShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    keepMeLogin: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleGetOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        BASE_URL + "/api/auth/getotplogin",
        formData,
        { withCredentials: true }
      );
      console.log(result.data);
      setIsEnterOtp(true);
      setLoading(false);
      toast(result.data.message);
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error(e.response.data.message);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        BASE_URL + "/api/auth/verifyotplogin",
        formData,
        { withCredentials: true }
      );
      console.log(result.data);
      dispatch(setUser(result.data.data));
      setIsEnterOtp(false);
      navigate("/dashboard");
      setLoading(false);
      toast(result.data.message);
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-16">
        {/* Logo */}
        <div className="flex items-center md:justify-start justify-center mb-8 w-full">
          <img className="md:hidden block " src={topMImg} alt="" />
          <img className="md:block hidden" src={topImg} alt="" />
        </div>

        {/* Form */}
        <div className="w-full max-w-md">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-semibold mb-2 mx-auto md:mx-0  ">
              Sign In
            </h1>
            <p className="text-gray-500 mb-6 mx-auto md:mx-0">
              Please login to continue to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            {/* Otp */}
            {isEnterOtp && (
              <div className="flex relative  ">
                <input
                  id="otp"
                  type={isShowOtp ? "text" : "password"}
                  name="otp"
                  placeholder="Otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full border  border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
                {!isShowOtp ? (
                  <FiEyeOff
                    onClick={() => setIsShowOtp((prev) => !prev)}
                    className="absolute z-5 right-3 top-1/2 -translate-y-1/2 w-[22px] h-[22px]"
                  />
                ) : (
                  <FiEye
                    onClick={() => setIsShowOtp((prev) => !prev)}
                    className="absolute z-6 right-3 top-1/2 -translate-y-1/2 w-[22px] h-[22px]"
                  />
                )}
              </div>
            )}
            {isEnterOtp && (
              <p
                onClick={handleGetOtp}
                className="mt-4 text-blue-600 font-medium underline text-sm cursor-pointer"
              >
                Resend Otp
              </p>
            )}
            {isEnterOtp && (
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="keepMeLogin"
                  onChange={handleChange}
                  className=" rounded-lg "
                />
                <label htmlFor="keepmelogin">Keep Me Login</label>
              </div>
            )}

            {/* Submit */}
            <button
              disabled={
                !isEnterOtp ? !formData.email : !formData.email || !formData.otp
              }
              onClick={!isEnterOtp ? handleGetOtp : handleVerifyOtp}
              className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition"
            >
              {!isEnterOtp ? (
                loading ? (
                  <ClipLoader size={30} color="white" />
                ) : (
                  "Get OTP"
                )
              ) : loading ? (
                <ClipLoader size={30} color="white" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Already have account */}
          <p className="mt-4 text-gray-500 text-sm">
            Need an account?{" "}
            <a href="/signup" className="text-blue-600 font-medium underline">
              Create one
            </a>
          </p>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:flex w-1/2">
        <img
          src={AuthLogoImg}
          alt="login"
          className="w-full h-full object-cover rounded-l-2xl"
        />
      </div>
    </div>
  );
};

export default Login;
