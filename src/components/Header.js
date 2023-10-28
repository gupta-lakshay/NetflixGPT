import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  // we want this code to be always present for auth logic
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        // update redux store state
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        // always want user to access browse only if signed in
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        // else redirect to login page
        navigate("/");
      }
    });
    // Header can be loaded multiple times and everytime event listener will be added so we need to unsubscribe when component unmounts
    // unsubscribe event listner -> onAuthStateChanged when comp unmounts
    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between">
      <img className="w-36" src={LOGO} alt="Netflix logo" />
      {user && (
        <div className="flex bg-gradient-to-br from-black rounded-full p-2">
          <img
            className="w-8 h-8 mt-2 mr-2"
            alt="avatar"
            src={user?.photoURL}
          ></img>
          <button className="font-bold text-white" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
