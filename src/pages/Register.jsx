import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password))
      return "Must contain at least one uppercase letter";
    if (!/[a-z]/.test(password))
      return "Must contain at least one lowercase letter";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      toast.error(passwordError);
      return;
    }

    try {
      const result = await createUser(email, password);

      await updateProfile(result.user, { displayName: name, photoURL });

      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="card bg-base-100 shadow-xl rounded-2xl">
        <div className="card-body space-y-6">
          {/* Heading */}
          <div className="text-center">
            <h2 className="text-2xl font-bold">Create Account</h2>
            <p className="text-sm text-base-content/70 mt-1">
              Join us and start participating today.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text text-sm font-medium">
                  Full Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="input input-bordered w-full h-12 rounded-xl"
                required
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text text-sm font-medium">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                className="input input-bordered w-full h-12 rounded-xl"
                required
              />
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text text-sm font-medium">
                  Photo URL
                </span>
              </label>
              <input
                type="url"
                name="photoURL"
                placeholder="https://your-photo-link.com"
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
                type="password"
                name="password"
                placeholder="••••••••"
                className="input input-bordered w-full h-12 rounded-xl"
                required
              />
              <p className="mt-1 text-[11px] text-base-content/60">
                Must be at least 6 characters, include one uppercase and one
                lowercase letter.
              </p>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Submit button */}
            <button className="btn btn-primary w-full h-12 rounded-xl text-base font-semibold mt-2">
              Create Account
            </button>
          </form>

          {/* Bottom link */}
          <p className="text-sm text-center pt-2">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
