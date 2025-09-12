import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";

const Login = ({ setcurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError("please enter a valid Email Address.");
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }

    setError("");

    //Login API call
    try{
    } catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }
      else{
        setError("Something went wrong, please try again.");
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please Enter your details to login
      </p>

      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="Elon@gmail.com"
          type="text"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="password"
          placeholder="Min 8 characters"
          type="password"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          LOGIN
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Don't have an account?{" "}
          <button
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => {
              setcurrentPage("signup");
            }}
          >
            SignUp
          </button>  
        </p>
      </form>
    </div>
  );
};

export default Login;
