import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartHeight, setChartHeight] = useState("200px");

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

  // 7-day raw data
  const rawData = [50, 70, 100, 80, 40, 60, 90];
  const total = rawData.reduce((sum, val) => sum + val, 0);

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Weekly Sale",
        data: rawData, // use actual numbers
        backgroundColor: [
          "#7086FD",
          "#6FD195",
          "#FFAE4C",
          "#07DBFA",
          "#988AFC",
          "#1F94FF",
          "#FF928A",
        ],
        borderWidth: 1,
        cutout: "50%", // donut chart
      },
    ],
  };

  // Plugin to draw total in center
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart) {
      const {
        ctx,
        chartArea: { width, height },
      } = chart;
      ctx.save();

      const totalFontSize = width < 400 ? 16 : width < 768 ? 20 : 24;

      ctx.font = `bold ${totalFontSize}px Arial`;
      ctx.fillStyle = "#3fae6a";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(total, width / 2, height / 2);

      ctx.restore();
    },
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
          // Show actual value in tooltip
          label: (context) => `${context.label}: ${context.raw}`,
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
        <Pie data={data} options={options} plugins={[centerTextPlugin]} />
      </div>
    </div>
  );
};

export default PieChart;
