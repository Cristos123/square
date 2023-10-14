"use client";

import PrimaryButtonComponent from "@/components/buttons/primary.button";
import TextInputComponent from "@/components/inputs/text.input";
import { formToJSON } from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import PasswordInputComponent from "@/components/inputs/password.input";

function SignInPage() {
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [phone, setPhone] = useState("");
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const handleOTPSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("pin", otp);
    formData.append("phone", phone);
    const json = formToJSON(formData);
    try {
      toast("Please wait...");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/auth/verify-login-token`,
        json
      );

      if (response.status == 200 || response.status == 201) {
        toast("Logged in successfully");

        globalThis.window?.localStorage.setItem("user_id", userId || "");
        globalThis.window?.localStorage.setItem(
          "token",
          response?.data?.data?.token
        );
        router.push("/store");
        setLoading(false);
      } else {
        toast("OTP has expired");
        setLoading(false);
      }
    } catch (e) {
      toast("OTP has expired");
      setLoading(false);
    }
  };

  // login func
  const handleVerifySubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const json = formToJSON(formData);

    try {
      toast("Please wait...");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT}auth/login/organizer`,
        json
      );
      console.log({ response });
      if (response.status == 200 || response.status == 201) {
        // toast("OTP sent to your email");
        toast("Login successful");

        globalThis.window?.localStorage.setItem(
          "organizer_user",
          response?.data?.CarOwnerUser?.id || ""
        );
        globalThis.window?.localStorage.setItem(
          "accessToken",
          response?.data?.accessToken || ""
        );
        globalThis.window?.localStorage.setItem(
          "refreshToken",
          response?.data?.refreshToken || ""
        );
        // setUserId(response?.data?.data?.data?.user_id);
        // setVerifyOTP(true);
        router.push("/crm/square");
        // setLoading(false);
      } else {
        toast("not-found");
        setLoading(false);
      }
    } catch (e) {
      toast(e.response?.data.message || e.message + ". Check your connection");
      setLoading(false);
    }
  };
  const handleResendOTP = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("signup", false);
    const json = formToJSON(formData);

    try {
      toast("Please wait...");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/auth/resend-otp/${userId}`,
        json
      );

      if (response.status == 200) {
        toast("OTP resent to your email");
        setLoading(false);
      } else {
        toast("invalid action");
        setLoading(false);
      }
    } catch (e) {
      toast(
        "Something went wrong, please check your internet connection or verify phone number again"
      );
      setLoading(false);
    }
  };

  return (
    <div className=" text-black my-auto">
      <div className="lg:text-3xl font-bold text-center">
        Catch Up With Your Trips
      </div>
      <div className="mt-8 lg:text-3xl font-bold text-center">Login</div>

      <form
        onSubmit={handleVerifySubmit}
        className="grid grid-cols-1 mx-auto md:w-1/2 lg:w-1/3 gap-4 mt-8"
        autoComplete="on"
      >
        <TextInputComponent
          placeholder="johndoe@gmail.com"
          label="Email:"
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          value={email}
          required
        />

        <PasswordInputComponent
          placeholder="******"
          label="Password:"
          name="password"
          type={visible ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          onVisible={() => setVisible(!visible)}
          value={password}
          required
        />

        <PrimaryButtonComponent
          disabled={loading}
          // title={"Send OTP"}
          title={"Submit"}
          type={"Submit"}
        />
        <div className="">
          Forgotten your password?{" "}
          <Link href={"/crm/square/auth/reset-token"}>
            <span className="text-purple-700">Reset password</span>
          </Link>
        </div>
        <div className="">
          New to Square CRM?{" "}
          <Link href={"/crm/square/auth/signup"}>
            <span className="text-purple-700">Sign up now</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignInPage;
