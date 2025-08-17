import React from "react";
import { FaCalendarDay, FaDollarSign } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { MdArrowUpward, MdOutlineHome } from "react-icons/md";
import { PiHouseLine } from "react-icons/pi";
import { Bar } from "react-chartjs-2";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import OrderTable from "../../components/home/OrderTable";
import SalesLeaderBoard from "../../components/home/SalesLeaderBoard";
import HomeCard from "../../components/home/HomeCard";
import { Marchant, Rewords } from "../../components/common/Svg";
import { People } from "../../components/common/Svg";
import { Pending } from "../../components/common/Svg";
import { SubscriptionManagement } from "../../components/common/Svg";
import { Sales } from "../../components/common/Svg";
import { Points } from "../../components/common/Svg";
import PieChart from "./PieChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Subscriptions",
        data: [64, 27, 83, 90, 87, 85, 70, 40, 32, 74, 65, 70],
        backgroundColor: "#3FC7EE",
        borderColor: "#A1A1A1",
        borderWidth: 1,
        barThickness: 24,
        maxBarThickness: 24,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: "#A1A1A1",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
          suggestedMin: 0,
          suggestedMax: 100,
        },
        grid: {
          display: true,
          lineWidth: 2,
        },
      },
    },
  };

  return (
    <div className="p-2 md:p-4 space-y-4 md:space-y-6">
      {/* Home Card */}
      {/* <div>
        <HomeCard />
      </div> */}

      {/* Line Chart Section */}
      {/* <div className="w-full">
        <div className="w-full bg-primary p-3 md:p-4 lg:p-6 rounded-lg">
          <LineChart />
        </div>
      </div> */}

      <div className="flex gap-10 rounded-lg">
        {/* Line Chart Section */}
        <div className=" flex-1 w-2/3 border border-primary bg-[#D7F4DE]  rounded-lg p-6">
          <PieChart />
        </div>
        <div className=" flex-1 w-2/3 border border-primary bg-[#D7F4DE]  rounded-lg p-6">
          <BarChart />
        </div>

        {/* Card Section */}
        <div className=" w-1/3 bg-[#D7F4DE] border border-primary p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4 text-white">
            <h2 className="text-secondary mt-4 text-[24px] font-bold">
              Statistics
            </h2>
            <p className=" font-medium text-[14px] py-[12px] px-[16px] border border-primary text-secondary rounded-lg">
              Last 7 Days
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 h-[240px]">
            <div className="bg-white border border-primary rounded-lg flex items-center justify-center">
              <div className="flex items-center">
                <div className="flex flex-col items-baseline">
                  <h2 className="text-center text-[16px] font-semibold mb-1">
                    Today's Sales
                  </h2>
                  <h3 className="text-secondary text-[24px] text-center font-semibold flex items-center gap-3">
                    <Sales className="w-[20px] h-[20px] text-secondary" />
                    $4,250.75
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white border border-primary rounded-lg flex items-center justify-center">
              <div className="flex items-center">
                <div className="flex flex-col items-baseline">
                  <h2 className="text-center text-[16px] font-semibold mb-1">
                    Total Members
                  </h2>
                  <h3 className="text-secondary text-[24px] text-center font-semibold flex items-center gap-3">
                    <People className="w-[20px] h-[20px] text-secondary" />
                    50
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white border border-primary rounded-lg flex items-center justify-center">
              <div className="flex items-center">
                <div className="flex flex-col items-baseline">
                  <h2 className="text-center text-[16px] font-semibold mb-1">
                    Points Issued Today
                  </h2>
                  <h3 className="text-secondary text-[24px] text-center font-semibold flex items-center gap-3">
                    <Points className="w-[20px] h-[20px] text-secondary" />
                    8,500
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white border border-primary rounded-lg flex items-center justify-center">
              <div className="flex items-center">
                <div className="flex flex-col items-baseline">
                  <h2 className="text-center text-[16px] font-semibold mb-1">
                    Rewards Redeemed
                  </h2>
                  <h3 className="text-secondary text-[24px] text-center font-semibold flex items-center gap-3">
                    <Rewords className="w-[20px] h-[20px] text-secondary" />
                    23
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Table */}
      <div>
        <OrderTable />
        {/* <SalesLeaderBoard /> */}
      </div>
    </div>
  );
};

export default Home;
