import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";

const SignUp = ({ setcurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle signup Form submit
  const handleSignUp = async (e) => {
    e.preventDefault();

  };
  return <div className="">
      <h3 className="">Create an Account</h3>
      <p className="">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp}>
        <div className="">
          <Input
              value={fullName}
              onChange={({target}) => setFullName(target.value)}
              label="Full Name"
              placeholder="Elon Musk"
              type="text"
          />

          <Input
              value={email}
              onChange={({target}) => setEmail(target.value)}
              label="Email Address"
              placeholder="elonmusk@gmail.com"
              type="text"
          />

          <Input
              value={password}
              onChange={({target}) => setPassword(target.value)}
              label="password"
              placeholder="Min 8 characters"
              type="password"
           />     
        </div>

        {error && <p className="">{error}</p>}

        <button type="submit" className="">
          SIGN UP
        </button>

        <p className="">
          Already had an account?{" "}
          <button 
            className=""
            onClick={() => {
              setcurrentPage("login")
            }}
          >
            Login
          </button>
        </p>
      </form>
  </div>
};

export default SignUp;
