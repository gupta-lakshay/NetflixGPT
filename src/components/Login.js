import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BKG_IMG, USER_AVATAR } from "../utils/constants";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const handleButtonClick = () => {
    //validate form data
    //console.log(email);
    //console.log(password.current.value);
    const msg = checkValidData(email.current.value, password.current.value);
    setErrorMsg(msg);
    if (msg) {
      return;
    }
    //sign in or sign up
    if (!isSignInForm) {
      // sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log("Successful sign up", user);
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              // using auth.currentUser as user does not have updated value as of now so we need to fetch that from auth
              const { uid, email, displayName, photoURL } = auth.currentUser;
              // update redux store state
              // adding this so that user display name and photoURL is updated bcz createUserWithEmailAndPassword execution calls authStatechange and update the user state first
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMsg(errorCode + " - " + errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + " - " + errorMessage);
        });
    } else {
      // sign in
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Successful sign in", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + " - " + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BKG_IMG} alt="Netflix background" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-black text-white absolute w-3/12 p-12 rounded-lg my-36 mx-auto right-0 left-0 bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            ref={name}
            placeholder="Full Name"
            className="p-4 my-4 bg-gray-700 rounded-sm w-full"
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email or phone number"
          className="p-4 my-4 bg-gray-700 rounded-sm w-full"
        />

        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 my-4  bg-gray-700 rounded-sm w-full"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMsg}</p>
        <button
          className="p-4 my-6 w-full bg-red-600 text-white rounded-md"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix ? Sign Up Now"
            : "Already Registered. Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
