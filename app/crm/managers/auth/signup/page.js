"use client";

import PrimaryButtonComponent from "@/components/buttons/primary.button";
import TextInputComponent from "@/components/inputs/text.input";
import talk from "@/helpers/talk";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { formToJSON } from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSearchParams } from "next/navigation";
import PasswordInputComponent from "@/components/inputs/password.input";

function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  const [cookies, setCookie] = useCookies(["ref"]);
  console.log({ name });
  useEffect(() => {
    if (!cookies.ref && ref !== null) {
      setCookie("ref", ref, { maxAge: 31536000 });
    }
  }, [cookies, ref]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      toast("Accept our terms and conditions to proceed");
    } else {
      setLoading(true);

      const formData = new FormData();
      formData.append("full_name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      const json = formToJSON(formData);

      try {
        toast("Please wait...");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_ENDPOINT}auth/register?${
            cookies.ref ? `ref=${cookies.ref}` : null
          }`,
          json
        );

        if (response.status == 200 || response.status == 201) {
          globalThis.window?.localStorage.setItem("name", name || "");
          toast("You have signed up succesfully");
          router.push("/crm/managers/auth/signin");
          setLoading(false);
        } else {
          toast("Failed to signup");
          setLoading(false);
        }
      } catch (e) {
        toast(
          e.response?.data.message.includes("duplicate")
            ? "Account with this email already exist."
            : e.response?.data.message.toString() ||
                e.message + ". Check your connection"
        );
        setLoading(false);
      }
    }
  };

  return (
    <div className=" text-black my-auto">
      <div className="lg:text-3xl font-bold text-center">
        Uber and Bolt Re-Imagined
      </div>
      <div className="mt-8 lg:text-3xl font-bold text-center">Sign Up</div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 mx-auto lg:w-1/3 md:w-1/2 gap-4 mt-8"
        autoComplete="on"
      >
        <TextInputComponent
          placeholder="Seun Dayo"
          label="Full name:"
          name="full_name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          value={name}
          required
        />
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
        <TextInputComponent
          placeholder="08112806410"
          label="Phone:"
          name="phone"
          type="tel"
          onChange={(e) => {
            if (e.target.value?.trim().startsWith("0")) {
              setPhone("+234" + e.target.value.trim()?.substring(1));
            } else {
              setPhone(e.target.value?.trim());
            }
          }}
          disabled={loading}
          value={phone}
          required
        />
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
        <div className="flex space-x-2">
          <input
            disabled={loading}
            type={"checkbox"}
            value={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <div className="">
            I agree to the Square&apos;s CRM{" "}
            <Link href={"#"}>
              <span className=" underline">terms of service</span>
            </Link>
          </div>
        </div>
        <PrimaryButtonComponent
          title={"Sign up"}
          type={"submit"}
          disabled={loading}
        />
        <div className="">
          Have an account?{" "}
          <Link href={"/crm/managers/auth/signin"}>
            <span className="text-blue-500">Login</span>
          </Link>
        </div>
        <PrimaryButtonComponent
          type={"button"}
          title={"Sell me"}
          onClick={() =>
            talk(
              "We Connect Car Owners and Passengers To And From Anywhere At Half The  Cost.      Help millions of students and working class reach their destination  while making money to reduce your fuel cost. "
            )
          }
        />
      </form>
    </div>
  );
}

export default SignUpPage;
