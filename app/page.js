"use client";

import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import LiveChatCard from "@/components/support/livechatcard";
import { Carousel } from "react-responsive-carousel";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/crm/square");
  }, []);

  return (
    <div></div>
    // <main className="flex min-h-screen  w-full bg-gradient-to-br dark:bg-black from-green-200 via-yellow-50 to-red-50 flex-col background-animate">
    //   <nav className="  p-8 px-4">
    //     <div className="relative h-4 w-32">
    //       <Image
    //         className=""
    //         src={"/assets/Instadrop3.png"}
    //         fill={true}
    //         quality={100}
    //       />
    //     </div>
    //   </nav>
    //   <section className="py-12 px-4 lg:max-w-3xl mx-auto">
    //     <div className="lg:text-3xl text-xl font-bold text-black text-center  mx-auto ">
    //       We Connect Car Owners and Passengers To And From Anywhere At Half The
    //       Cost.
    //     </div>
    //     <div className="my-8 text-center  mx-auto text-gray-600 font-bold ">
    //       Help millions of students and working class reach their destination
    //       while making money to reduce your fuel cost.
    //     </div>
    //     <div className="grid grid-cols-2 gap-8">
    //       <div className="w-full text-center p-4 bg-black mx-auto rounded-md text-white my-8 cursor-pointer ">
    //         <a href="carowner/auth/signup"> Carowner</a>
    //       </div>

    //       <div className="w-full text-center p-4  bg-black mx-auto rounded-md text-white my-8 cursor-pointer ">
    //         <a href="passenger/auth/signup"> Passenger</a>
    //       </div>
    //     </div>

    //     <div className=" w-full ">
    //       <Carousel
    //         showThumbs={false}
    //         showIndicators={false}
    //         interval={3000}
    //         showStatus={false}
    //         autoPlay={true}
    //         infiniteLoop={true}
    //         showArrows={false}
    //       >
    //         <div>
    //           <img
    //             className="object-cover h-72 w-full rounded-lg"
    //             src={"/assets/carowner.jpeg"}
    //           />
    //         </div>
    //         <div>
    //           <img
    //             className=" object-cover h-72 w-full rounded-lg"
    //             src={"/assets/passenger.jpeg"}
    //           />
    //         </div>
    //         <div>
    //           <img
    //             className=" object-cover h-72 w-full rounded-lg"
    //             src={"/assets/imagesdrop.jpeg"}
    //           />
    //         </div>
    //         <div>
    //           <img
    //             className=" object-cover h-72 w-full rounded-lg"
    //             src={"/assets/imagesdrop1.jpeg"}
    //           />
    //         </div>
    //         <div>
    //           <img
    //             className=" object-cover h-72 w-full rounded-lg"
    //             src={"/assets/imagesdrop2.jpeg"}
    //           />
    //         </div>
    //       </Carousel>
    //     </div>
    //   </section>
    //   <div className="text-center py-4 text-black">
    //     &copy;&nbsp;{new Date().getFullYear()}
    //   </div>
    //   <LiveChatCard />
    // </main>
  );
}
