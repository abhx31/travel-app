import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { TextLink } from "../components/TextLink";
import { useState } from "react";
import axios from "axios";
import { SigninInput } from "@abhiram2k03/input-validation";

export const Signin = () => {
  const [signinData, setSigninData] = useState<SigninInput>({
    email: "",
    password: ""
  })
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/signin', { 
      
        email: signinData.email,
        password: signinData.password,
       });
      alert(response.data.msg);
      if (response.data.msg === "Signin successful") {
        navigate('/profile');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border bg-white p-8 rounded-xl shadow-xl text-center">
        <Heading text={"Signin"} />
        <SubHeading text={"Enter your details to signin"} />
        
        <InputBox
          type="email"
          label="Email"
          placeholder="john123@gmail.com"
          onChange={(e) => {
            setSigninData({
              ...signinData,
              email: e.target.value
            })
          }}
        />
        <InputBox
          type="password"
          label="Password"
          placeholder="password"
          onChange={(e) => {
            setSigninData({
              ...signinData,
              password: e.target.value
            })
          }}
        />
        <div className="flex justify-end">
          <TextLink text={"Forgot password?"} linkTo={"/forgotpassword"} />
        </div>
        <Button text="Submit" onClick={handleSubmit} />
        <div className="flex justify-end">
          <TextLink text={"Don't have an account?"} linkTo={"/"} />
        </div>
      </div>
    </div>
  );
};