import React from "react";
import { Button, Flex } from "antd";

export default function TierSystem() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6 ">
        <div>
          <h1 className="text-[24px] font-bold">Loyalty Program Management</h1>
          <p className="text-[16px] font-normal mt-2">
            Configure your tiers, rewards, and point accumulation rules.
          </p>
        </div>
      </div>
      <div className="px-8 py-8 flex flex-col gap-4 border border-gray-200 rounded-lg">
        {/* Basic */}
        <div className="px-6 py-4 rounded-lg border border-primary bg-white">
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-[24px] text-secondary">Basic</h2>
              <p>Tier (Basic) Points Threshold: 0</p>
              <p>Tier Reward: 10% Off</p>
            </div>
            <Button className="bg-primary text-white hover:text-secondary font-bold">
              Edit Tier
            </Button>
          </div>
        </div>
        {/* Gold */}
        <div className="px-6 py-4 rounded-lg border border-primary bg-white">
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-[24px] text-secondary">Gold</h2>
              <p>Tier (Basic) Points Threshold: 0</p>
              <p>Tier Reward: 10% Off</p>
            </div>
            <Button className="bg-primary text-white hover:text-secondary font-bold">
              Edit Tier
            </Button>
          </div>
        </div>
        {/* Premium */}
        <div className="px-6 py-4 rounded-lg border border-primary bg-white">
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-[24px] text-secondary">Premium</h2>
              <p>Tier (Basic) Points Threshold: 0</p>
              <p>Tier Reward: 10% Off</p>
            </div>
            <Button className="bg-primary text-white hover:text-secondary font-bold">
              Edit Tier
            </Button>
          </div>
        </div>
      </div>
      <div className="px-8 py-8">
        <div className="px-6 py-4 rounded-lg border border-primary bg-white flex flex-col gap-2 mt-2">
          <h2 className="font-bold text-[24px] text-secondary">
            Tier System Change Log
          </h2>
          <p>Added Gold Tier with 10000 points threshold.</p>
          <p>admin@merchant.com - 2024-06-15 10:30 AM</p>
          <p>Updated Silver Tier point multiplier to 1.5x.</p>
          <p>admin@merchant.com - 2024-06-10 02:00 PM</p>
        </div>
      </div>
    </div>
  );
}
