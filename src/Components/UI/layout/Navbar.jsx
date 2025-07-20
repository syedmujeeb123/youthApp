import { Link } from "react-router-dom";
import LogoDemo from "../reusable/Logo";
import ProfileModal from "../../pages/ProfileModal";
import { useAuth } from "../../../context/AuthContext";
//  _________________________________________________________________________________________________
// my changes

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useFirebase } from "../../../context/Me_Firebase"; // adjust path
import { db } from "../../../context/Me_Firebase";

import Show_username from "../reusable/Show_username";

//  _________________________________________________________________________________________________

function Navbar() {
  // const { user } = useAuth();
  const { user, isloggedin } = useFirebase();
  const [userName, setUserName] = useState("Guest");
  const [isOpen, setIsOpen] = useState(false);

  //  _________________________________________________________________________________________________
  // my changes
  useEffect(() => {
    const fetchUserName = async () => {
      if (user && isloggedin) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.name || "User");
          }
        } catch (error) {
          console.error("Error fetching user name:", error);
        }
      }
    };

    fetchUserName();
  }, [user, isloggedin]);

  //  _________________________________________________________________________________________________

  return (
    <>
      <div className="fixed mt-8 z-50 left-0 right-0 mx-auto shadow-md px-4 rounded-full w-[90%] bg-black bg-opacity-30 text-white backdrop-blur-md">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer">
            <LogoDemo />
          </div>

          {/* Hamburger (Mobile Only) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex gap-6 text-white font-medium">
            <Link to="/">
              <li className="cursor-pointer hover:text-blue-400">Home</li>
            </Link>
            <Link to="/application_form">
              <li className="cursor-pointer hover:text-blue-400">
                Accountability-Form
              </li>
            </Link>
            <Link to="/about">
              <li className="cursor-pointer hover:text-blue-400">About Us</li>
            </Link>
            <Link to="/contact">
              <li className="cursor-pointer hover:text-blue-400">Contact Us</li>
            </Link>
          </ul>

          {/* Username + Profile (always visible) */}
          <div className="flex items-center space-x-2">
            <p className="hover:font-bold cursor-pointer">
              <span className="block lg:hidden">{userName.split(" ")[0]}</span>
              <span className="hidden lg:inline">{userName}</span>
            </p>
            <ProfileModal />
          </div>
        </div>
      </div>
      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-[100px] left-1/2 transform -translate-x-1/2 w-[90%] bg-black bg-opacity-70 p-4 rounded-xl shadow-lg backdrop-blur-md z-[9999]">
          {/* 🔧 Made absolute */}
          <ul className="flex flex-col space-y-4 text-white font-medium text-center">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <li className="hover:text-blue-400">Home</li>
            </Link>
            <Link to="/application_form" onClick={() => setIsOpen(false)}>
              <li className="hover:text-blue-400">Accountability-Form</li>
            </Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              <li className="hover:text-blue-400">About Us</li>
            </Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              <li className="hover:text-blue-400">Contact Us</li>
            </Link>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
