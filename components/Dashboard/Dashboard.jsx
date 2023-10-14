"use client";

import React from "react";
import { useForm } from "react-hook-form";
import InputSelect from "../inputsComponent/InputSelect";
import { Switch } from "@mui/material";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const currenty = [
  {
    value: "naira",
    label: "Nigeria Naira NGN",
  },
  {
    value: "yen",
    label: "Japan Yen JPY",
  },
];

export const Status = ({ status }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div class="snap-start shrink-0">
      <div className="h-40 w-80 rounded-lg border bg-gradient-to-br from-gray-50 to-white p-4 flex">
        <div className="my-auto w-full">
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center ">
              <p className="font-light  text-3xl text-md">{status.icon}</p>
              <div className="flex flex-col px-1">
                <p className="font-light  px-1 text-md">{status.name}</p>
                <p className="font-light px-1 text-md">{status.value}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const PaymentStatus = ({ payment }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div class="snap-start shrink-0">
      <div className="h-40 w-80 rounded-lg border bg-gradient-to-br from-gray-50 to-white p-4 flex">
        <div className="my-auto w-full">
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center ">
              <p className="font-light  text-4xl text-md">{payment.icon}</p>

              <p className="font-light  px-1 text-md">{payment.name}</p>
            </div>
            <p className="font-light px-1 text-md">{payment.value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export const Ordertatus = ({ order }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div class="snap-start shrink-0">
      <div className="h-40 w-80 rounded-lg border bg-gradient-to-br from-gray-50 to-white p-4 flex">
        <div className="my-auto w-full">
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center ">
              <span className="font-light  text-4xl ">{order.icon}</span>

              <p className="font-light  px-2 text-md">{order.name}</p>
            </div>
            <p className="font-light px-1 text-md">{order.value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// const engagementChartData = {
//   labels: ["Week 1", "Week 2", "Week 3"], // Weekly dates
//   datasets: [
//     {
//       label: "Next.js App",
//       data: [60, 65, 70], // Numerical values
//       borderColor: "blue",
//       fill: false,
//     },
//     {
//       label: "CSR App",
//       data: [75, 70, 80], // Numerical values
//       borderColor: "red",
//       fill: false,
//     },
//   ],
// };

// const engagementChartOptions = {
//   scales: {
//     x: {
//       type: "category", // Use 'category' scale for weekly dates
//     },
//     y: {
//       beginAtZero: true, // Start y-axis from 0
//     },
//   },
//   // Other chart options here
// };

// export const ChartsPage = () => {
//   return (
//     <div>
//       <h1>Next.js Charts</h1>
//       <div>
//         <h2>User Engagement Comparison</h2>
//         <Line data={engagementChartData} options={engagementChartOptions} />
//       </div>
//       {/* Other charts */}
//     </div>
//   );
// };

// const getCurrentMonthWeeks = () => {
//   const currentDate = new Date();
//   const currentMonth = currentDate.getMonth();
//   const weeks = [];

//   const startDate = new Date(currentDate.getFullYear(), currentMonth, 1);

//   while (startDate.getMonth() === currentMonth) {
//     const endDate = new Date(startDate);
//     endDate.setDate(startDate.getDate() + 6);

//     weeks.push({
//       start: new Date(startDate),
//       end: new Date(endDate),
//     });

//     startDate.setDate(endDate.getDate() + 1);
//   }

//   return weeks;
// };

const getNextFourWeeks = () => {
  const currentDate = new Date();
  const weeks = [];

  for (let i = 0; i < 4; i++) {
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() + i * 7);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    weeks.push({
      start: new Date(startDate),
      end: new Date(endDate),
    });
  }

  return weeks;
};

const weeks = getNextFourWeeks();

const engagementData = [60, 65, 70, 90]; // Numerical values
const minEngagement = Math.min(...engagementData);
const maxEngagement = Math.max(...engagementData);

const engagementChartData = {
  labels: weeks.map((week) => `Week ${week.start.getDate()}`), // Weekly dates
  datasets: [
    {
      label: "Engagement",
      data: engagementData,
      borderColor: "blue",
      fill: false,
    },
  ],
};

const engagementChartOptions = {
  scales: {
    x: {
      type: "category", // Use 'category' scale for weekly dates
    },
    y: {
      beginAtZero: false, // Let the y-axis start from the smallest value
      suggestedMin: minEngagement, // Suggested minimum value for the y-axis
      suggestedMax: maxEngagement, // Suggested maximum value for the y-axis
    },
  },
  // Other chart options here
};

export const ChartsPage = () => {
  return (
    // <div>
    //   <h1>Next.js Charts</h1>
    //   <div>
    //     <h2>User Engagement</h2>
    //     <Line data={engagementChartData} options={engagementChartOptions} />
    //   </div>
    //   {/* Other charts */}
    // </div>
    <>
      <div className="min-h-screen ">
        {/* <h1 className="text-3xl font-bold mb-4">Ns</h1> */}
        <div className="bg-white p-4 rounded-md shadow-md mb-4">
          <h2 className="text-xl font-semibold mb-2">Product Revenue</h2>
          <Line data={engagementChartData} options={engagementChartOptions} />
        </div>{" "}
        <div className="bg-white p-4 rounded-md shadow-md mb-4">
          <h2 className="text-xl font-semibold mb-2">Category Revenue</h2>
          <Line data={engagementChartData} options={engagementChartOptions} />
        </div>{" "}
        <div className="bg-white p-4 rounded-md shadow-md mb-4">
          <h2 className="text-xl font-semibold mb-2">Sales</h2>
          <Line data={engagementChartData} options={engagementChartOptions} />
        </div>
      </div>{" "}
    </>
  );
};
