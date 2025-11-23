import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { ThemeContext } from "../providers/ThemeProvider";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    logOut().catch((err) => console.error(err));
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/" end>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/upcoming-events">Upcoming Events</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/create-event">Create Event</NavLink>
          </li>
          <li>
            <NavLink to="/manage-events">Manage Events</NavLink>
          </li>
          <li>
            <NavLink to="/joined-events">Joined Events</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-base-100 border-b">
      <div className="navbar max-w-6xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] 
                p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl font-bold">
            SocialEvents
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end gap-2">
          {/* ✅ Theme toggle button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-sm btn-ghost"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {user ? (
            <>
              <div className="flex items-center gap-2">
                {user.photoURL && (
                  <div
                    className="tooltip tooltip-bottom"
                    data-tip={user.displayName || user.email}
                  >
                    <img
                      src={user.photoURL}
                      alt="avatar"
                      className="w-10 h-10 rounded-full border"
                    />
                  </div>
                )}
                {!user.photoURL && (
                  <span className="font-medium">
                    {user.displayName || user.email}
                  </span>
                )}
              </div>
              <button onClick={handleLogout} className="btn btn-sm btn-outline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
