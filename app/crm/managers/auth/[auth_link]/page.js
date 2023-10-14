"use client";

import VerifiedIcon from "@mui/icons-material/Verified";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import LinkIcon from "@mui/icons-material/Link";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Loading from "@/components/loader/loading";
import useSWR from "swr";
import { useEffect } from "react";
import OneSignal from "react-onesignal";
import { useParams, useRouter } from "next/navigation";

const NEXT_PUBLIC_ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
export default function BindingPage() {
  //   const [auth_link, setAuthLink] = useState(null);
  const [isBinding, setIsBinding] = useState(true);
  const router = useRouter();
  const auth_link = useParams();
  console.log(auth_link);
  //   useEffect(() => {
  //     if (auth_link == null) {
  //       let auth_link_d = globalThis.window?.location.href;
  //       setAuthLink(auth_link_d?.split("/")[4]);
  //       console.log(auth_link_d);
  //     }
  //   }, [auth_link]);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    auth_link
      ? `${NEXT_PUBLIC_ENDPOINT}manager/auth/${auth_link?.auth_link}`
      : null,
    fetcher
  );

  console.log(error, data, "data?.id", data?.id);

  useEffect(() => {
    if ((auth_link !== null) & (data?.statusCode != 404)) {
      if (!isLoading && data) {
        // console.log("it enter not loading");
        let externalUserId = data?.data?.id;
        console.log({ externalUserId, data }, "data?.id", data?.data?.id);
        globalThis.window?.localStorage.setItem(
          "manager_user",
          data?.data?.id || data?.id
        );

        if (externalUserId) {
          toast.success("Logged in!!!");
          router.push("/crm/managers");
        }
      }
    }
  }, [auth_link, data, data?.data?.id, isLoading]);

  if (isLoading || !auth_link) {
    return <Loading />;
  }
  //   if (data?.error || error) {
  //     return <Error />;
  //   }
  return (
    <div className=" flex w-full flex-col my-4">
      <div className="mt-0 text-center">
        {isBinding
          ? "Binding device..."
          : data?.statusCode == 404
          ? "Invalid link"
          : "Logged In!!!"}
      </div>
    </div>
  );
}
