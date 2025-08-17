import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartHeight, setChartHeight] = useState("200px");

  // Update chart height based on screen size
  useEffect(() => {
    const updateChartHeight = () => {
      if (window.innerWidth < 768) setChartHeight("150px");
      else if (window.innerWidth < 1024) setChartHeight("200px");
      else setChartHeight("250px");
    };

    updateChartHeight();
    window.addEventListener("resize", updateChartHeight);
    return () => window.removeEventListener("resize", updateChartHeight);
  }, []);

  // 7-day data
  const rawData = [50, 70, 100, 80, 40, 60, 90];
  const maxValue = Math.max(...rawData);

  // Convert to % of max
  const percentageData = rawData.map((val) =>
    ((val / maxValue) * 100).toFixed(2)
  );

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Performance % of max",
        data: percentageData,
        backgroundColor: [
          "#3fae6a",
          "#198248",
          "#6FCF97",
          "#4AAE6A",
          "#1F7A3A",
          "#3FCF7A",
          "#2E8B57",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#181818",
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}% of max`,
        },
        backgroundColor: "#3fae6a",
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 6,
      },
    },
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 sm:mb-4 gap-2 sm:gap-0">
        <div className="flex justify-between items-center text-white w-full">
          <h2 className="text-secondary mt-4 text-[24px] font-bold">
            Weekly Sell
          </h2>
        </div>
      </div>
      <div style={{ width: "100%", height: chartHeight }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
