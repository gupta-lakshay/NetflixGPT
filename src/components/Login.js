import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  const navigate = useNavigate();
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
            photoURL:
              "https://m.media-amazon.com/images/G/02/CerberusPrimeVideo-FN38FSBD/adult-2.png",
          })
            .then(() => {
              // Profile updated!
              // using auth.currentUser as user does not have updated value as of now so we need to fetch that from auth
              const { uid, email, displayName, photoURL } = auth.currentUser;
              // update redux store state
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
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
          navigate("/browse");
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
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="Netflix logo"
        />
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
