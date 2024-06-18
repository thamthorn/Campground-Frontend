"use client";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import config from "@/utils/config";

function SignInForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const user = {
        email,
        password,
      };

      // Send a POST request to the server to handle sign-in
      const response = await axios.post(`${config.api}/auth/login`, user);

      if (response.data.success === true) {
        // Optionally store user session/token
        Swal.fire({
          title: "Sign In",
          text: "Sign in successful.",
          timer: 2000,
        });
        // Redirect the user after successful sign-in
        localStorage.setItem(config.tokenName, response.data.token);

        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        throw new Error("Sign In failed.");
      }
    } catch (error: any) {
      Swal.fire({
        title: "Sign In Error",
        text: error.response
          ? error.response.data.message
          : "An error occurred",
        timer: 2000,
      });
      console.log(error.message);
      console.error("Sign In Error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold text-black">Login</h1>
      {/* <form className="mt-8 w-full max-w-md" onSubmit={onSubmit}> */}
      <div className="mt-8 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between my-2">
            <label
              className="w-1/3 text-right text-gray-700 "
              htmlFor="address"
            >
              Email
            </label>
            <input
              type="email"
              required
              id="email"
              name="email"
              placeholder="Email"
              className="input-field border-2 border-gray-200 rounded-sm bg-white text-black"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between my-2">
            <label className="w-1/3 text-right text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              required
              id="password"
              name="password"
              placeholder="Password"
              className="border-2 border-gray-200 rounded-sm text-black bg-white focus:border-blue-500 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-row justify-center">
            <button
              className="rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 mt-4 text-white items-center"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
