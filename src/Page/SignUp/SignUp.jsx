import SocialLogin from "@/AllComponents/SocialLogin/SocialLogin";
import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import register1 from '../../assets/register/register.json'
import Lottie from "lottie-react";

const SignUp = () => {
  const { handleSignUp, handleUpdateProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const result = await handleSignUp(data.email, data.password);
      let user = {
        name: data.username,
        phone: data.mobile,
        photo: data.photo,
        email: data.email,
        role: data.role,
      };

      if (data.role === "deliveryMan") {
        user.count = 0;
      }

      const response = await axiosPublic.post("/users", user);

      if (response.data.insertedId) {
        toast.success("User created successfully.");
        navigate('/')
        await handleUpdateProfile(data.username, data.photo);
        reset();
      }
    } catch (err) {
      console.error("Error during registration:", err.message);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen lg:flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-200">
      <div className="w-full max-w-lg p-8 bg-white shadow-xl rounded-lg relative overflow-hidden">
        {/* Decorative Top Background */}
        <div className="absolute -top-14 -right-14 w-32 h-32 bg-blue-500 rounded-full opacity-30"></div>
        <div className="absolute -bottom-14 -left-14 w-32 h-32 bg-blue-300 rounded-full opacity-30"></div>

        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Create an Account
        </h2>
        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username", { required: true })}
              placeholder="Enter your username"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">
                Username is required.
              </p>
            )}
          </div>

          {/* Mobile Input */}
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-600"
            >
              Mobile No
            </label>
            <input
              id="mobile"
              type="tel"
              {...register("mobile", { required: true })}
              placeholder="Enter your mobile number"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.mobile ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.mobile && (
              <p className="text-sm text-red-500 mt-1">
                Mobile number is required.
              </p>
            )}
          </div>

          {/* Photo URL Input */}
          <div>
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-600"
            >
              Photo URL
            </label>
            <input
              id="photo"
              type="text"
              {...register("photo", { required: true })}
              placeholder="Enter photo URL"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.photo ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.photo && (
              <p className="text-sm text-red-500 mt-1">Photo URL is required.</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter your email"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Enter your password"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-600"
            >
              Select Role
            </label>
            <select
              id="role"
              {...register("role", { required: true })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select an option</option>
              <option value="user">User</option>
              <option value="deliveryMan">Delivery Man</option>
            </select>
            {errors.role && (
              <p className="text-sm text-red-500 mt-1">Role is required.</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white py-3 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        {/* Redirect to Login */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline font-medium">
            Log In
          </Link>
        </p>

        {/* Social Login */}
        <div className="mt-6">
          <SocialLogin />
        </div>
      
      </div>
      <Lottie animationData={register1}></Lottie>
    </div>
  );
};

export default SignUp;
