"use client";

import PrimaryButtonComponent from "@/components/buttons/primary.button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { formToJSON } from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import PasswordInputComponent from "@/components/inputs/password.input";

function ResetPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible_i, setVisible_i] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      toast.error("Make sure both passwords are same");
    } else {
      setLoading(true);

      const formData = new FormData();
      formData.append("password", password);
      formData.append("reset_token", token);
      const json = formToJSON(formData);
      try {
        toast("Please wait...");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_ENDPOINT}auth/change-password/carowner`,
          json
        );

        if (response.status == 200 || response.status == 201) {
          toast.success("Password updated successfully");
          router.push("/carowner/auth/signin");
          setLoading(false);
        } else {
          toast("Failed to change");
          setLoading(false);
        }
      } catch (e) {
        toast(
          e.response?.data.message || e.message + ". Check your connection"
        );
        setLoading(false);
      }
    }
  };

  return (
    <div className=" text-black my-auto">
      <div className="lg:text-3xl font-bold text-center">
        Reset Your carowner Password
      </div>
      {/* <div className="mt-8 lg:text-3xl font-bold text-center">Sign Up</div> */}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 mx-auto lg:w-1/3 md:w-1/2 gap-4 mt-8"
        autoComplete="on"
      >
        <PasswordInputComponent
          placeholder="********"
          label="Password:"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          type={visible ? "text" : "password"}
          onVisible={() => setVisible(!visible)}
          value={password}
          required
        />

        <PasswordInputComponent
          placeholder="********"
          label="Confirm Password:"
          name="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
          type={visible_i ? "text" : "password"}
          onVisible={() => setVisible_i(!visible_i)}
          value={confirm_password}
          required
        />

        <PrimaryButtonComponent
          title={"Reset password"}
          type={"submit"}
          disabled={loading}
        />
      </form>
    </div>
  );
}

export default ResetPasswordPage;
