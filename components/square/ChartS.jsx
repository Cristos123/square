"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const ChartS = ({ header, footer }) => {
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
  return (
    <div className="min-h-screen ">
      {/* <h1 className="text-3xl font-bold mb-4">Ns</h1> */}
      <div className="bg-white p-4 rounded-md shadow-md mb-4">
        <h2 className="text-xl font-semibold mb-2">{header}</h2>
        <Line data={engagementChartData} options={engagementChartOptions} />

        {footer}
      </div>{" "}
    </div>
  );
};

export default ChartS;
