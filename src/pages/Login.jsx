import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInUser(email, password);
      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error("Login failed!");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error("Google login failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="card bg-base-100 shadow-xl rounded-2xl">
        <div className="card-body space-y-6">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text text-sm font-medium">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full h-12 rounded-xl"
                required
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text text-sm font-medium">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                className="input input-bordered w-full h-12 rounded-xl"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button className="btn btn-primary w-full h-12 rounded-xl mt-2">
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full h-12 rounded-xl"
          >
            Continue with Google
          </button>

          <p className="text-sm text-center pt-2">
            New here?{" "}
            <Link to="/register" className="link link-primary font-medium">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
