import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";

const Login = ({ login, signup }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const isSignup = activeTab === "signup";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const switchTab = (tab) => {
    if (isLoading || activeTab === tab) return;
    setActiveTab(tab);
    setData({ name: "", email: "", password: "" });
    setShowPass(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const payload = {
        ...(isSignup && { name: data.name.trim() }),
        email: data.email.trim(),
        password: data.password,
      };

      await (isSignup ? signup(payload) : login(payload));

      setData({ name: "", email: "", password: "" });
    } catch (error) {
      toast.error("Error:" + error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition-colors focus:ring-4 disabled:cursor-not-allowed disabled:bg-gray-50 ${
      errors[field]
        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
        : "border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-blue-100"
    }`;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-blue-50/50 px-4 py-10">
      {/* Background */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/50 sm:p-8">
          {/* Tabs */}
          <div className="mb-7 grid grid-cols-2 rounded-xl bg-gray-100 p-1">
            {["login", "signup"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => switchTab(tab)}
                disabled={isLoading}
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed ${
                  activeTab === tab
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Form Error */}
            {errors.form && (
              <div
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600"
              >
                {errors.form}
              </div>
            )}

            {/* Name */}
            {isSignup && (
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>

                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="name"
                    placeholder="Enter your name"
                    className={inputClass("name")}
                  />
                </div>

                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={inputClass("email")}
                />
              </div>

              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  placeholder="Enter your password"
                  className={`${inputClass("password")} pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowPass((prev) => !prev)}
                  disabled={isLoading}
                  aria-label={showPass ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-blue-600 disabled:cursor-not-allowed"
                >
                  {showPass ? (
                    <IoMdEye className="h-5 w-5" />
                  ) : (
                    <IoMdEyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
                  <span>
                    {isSignup ? "Creating account..." : "Signing in..."}
                  </span>
                </>
              ) : (
                <span>{isSignup ? "Create Account" : "Sign In"}</span>
              )}
            </button>
          </form>

          {/* Switch Tab */}
          <p className="mt-6 text-center text-sm text-gray-500">
            {isSignup ? "Already have an account?" : "New to this app?"}{" "}
            <button
              type="button"
              onClick={() => switchTab(isSignup ? "login" : "signup")}
              disabled={isLoading}
              className="font-semibold text-blue-600 transition-colors hover:text-blue-700 disabled:cursor-not-allowed"
            >
              {isSignup ? "Login" : "Create account"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
