"use client";

import PrimaryButtonComponent from "@/components/buttons/primary.button";
import TextInputComponent from "@/components/inputs/text.input";
import axios from "axios";
import { formToJSON } from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

function ResetTokenPage() {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Input a valid email!!!");
    } else {
      setLoading(true);

      const formData = new FormData();

      formData.append("email", email);

      const json = formToJSON(formData);

      try {
        toast("Please wait...");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_ENDPOINT}auth/forgot-password/carowner`,
          json
        );

        if (response.status == 200 || response.status == 201) {
          toast.success("Check email or spam for reset link");
          setLoading(false);
        } else {
          toast("This account does not exist");
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
        Reset Your Password
      </div>
      {/* <div className="mt-8 lg:text-3xl font-bold text-center">Send Token</div> */}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 mx-auto lg:w-1/3 md:w-1/2 gap-4 mt-8"
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
        <PrimaryButtonComponent
          title={"Reset"}
          type={"submit"}
          disabled={loading}
        />
      </form>
    </div>
  );
}

export default ResetTokenPage;
