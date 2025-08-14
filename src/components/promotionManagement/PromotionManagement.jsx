import React, { useState } from "react";
import { Table, Button, Modal, Tooltip, Switch } from "antd";
import { FaTrash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import MarchantIcon from "../../assets/marchant.png";
import NewCampaign from "../promotionManagement/components/NewCampaing.jsx";

const components = {
  header: {
    row: (props) => (
      <tr
        {...props}
        style={{
          backgroundColor: "#f0f5f9",
          height: "50px",
          color: "secondary",
          fontSize: "18px",
          textAlign: "center",
          padding: "12px",
        }}
      />
    ),
    cell: (props) => (
      <th
        {...props}
        style={{
          color: "secondary",
          fontWeight: "bold",
          fontSize: "18px",
          textAlign: "center",
          padding: "12px",
        }}
      />
    ),
  },
};

const PromotionManagement = () => {
  const [data, setData] = useState([
    {
      id: 1,
      promotionName: "Spring Sale",
      promotionType: "Discount",
      customerReach: 1000,
      customerSegment: "New Customers",
      discountPercentage: 20,
      startDate: "2023-03-01",
      endDate: "2023-03-31",
      status: "Active",
    },
  ]);

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isNewCampaignModalVisible, setIsNewCampaignModalVisible] =
    useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const showViewModal = (record) => {
    setSelectedRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalVisible(false);
    setSelectedRecord(null);
  };

  const handleAddCampaign = (newCampaign) => {
    setData((prev) => [
      ...prev,
      { id: prev.length + 1, status: "Active", ...newCampaign },
    ]);
    setIsNewCampaignModalVisible(false);
    Swal.fire({
      icon: "success",
      title: "Campaign Added!",
      text: "Your new campaign has been added successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const columns2 = [
    { title: "SL", dataIndex: "orderId", key: "orderId" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Reward", dataIndex: "quantity", key: "quantity" },
    { title: "Points Used", dataIndex: "amount", key: "amount" },
  ];

  const columns = [
    { title: "SL", dataIndex: "id", key: "id", align: "center" },
    {
      title: "Promotion Name",
      dataIndex: "promotionName",
      key: "promotionName",
      align: "center",
    },
    {
      title: "Promotion Type",
      dataIndex: "promotionType",
      key: "promotionType",
      align: "center",
    },
    {
      title: "Customer Reach",
      dataIndex: "customerReach",
      key: "customerReach",
      align: "center",
    },
    {
      title: "Customer Segment",
      dataIndex: "customerSegment",
      key: "customerSegment",
      align: "center",
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      align: "center",
    },
    {
      title: "Date",
      key: "dateRange",
      align: "center",
      render: (_, record) => {
        const start = record.startDate
          ? new Date(record.startDate).toLocaleDateString()
          : "-";
        const end = record.endDate
          ? new Date(record.endDate).toLocaleDateString()
          : "-";
        return (
          <div className="flex flex-col items-start justify-center gap-1">
            <p>
              <span className="font-bold">Start Date: </span>
              <span className="border border-primary px-[5px] py-[1px] rounded-sm">
                {start}
              </span>
            </p>
            <p>
              <span className="font-bold">End Date: </span>
              <span className="border border-primary px-[5px] py-[1px] rounded-sm">
                {end}
              </span>
            </p>
          </div>
        );
      },
    },
    { title: "Status", dataIndex: "status", key: "status", align: "center" },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="py-[10px] px-[10px] border border-primary rounded-md">
          <div className="flex gap-2 justify-between align-middle">
            <Tooltip title="View Details">
              <button
                onClick={() => showViewModal(record)}
                className="text-primary hover:text-green-700 text-xl"
              >
                <IoEyeSharp />
              </button>
            </Tooltip>
            <Tooltip title="Delete">
              <button
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setData(data.filter((item) => item.id !== record.id));
                      Swal.fire({
                        title: "Deleted!",
                        text: "Your record has been deleted.",
                        icon: "success",
                      });
                    }
                  });
                }}
                className="text-red-500 hover:text-red-700 text-md"
              >
                <FaTrash />
              </button>
            </Tooltip>
            <Switch
              size="small"
              checked={record.status === "Active"}
              style={{
                backgroundColor:
                  record.status === "Active" ? "#3fae6a" : "gray",
              }}
              onChange={(checked) => {
                Swal.fire({
                  title: "Are you sure?",
                  text: `You are about to change status to ${
                    checked ? "Active" : "Inactive"
                  }.`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, change it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    setData((prev) =>
                      prev.map((item) =>
                        item.id === record.id
                          ? { ...item, status: checked ? "Active" : "Inactive" }
                          : item
                      )
                    );
                    Swal.fire({
                      title: "Updated!",
                      text: `Status has been changed to ${
                        checked ? "Active" : "Inactive"
                      }.`,
                      icon: "success",
                      timer: 1500,
                      showConfirmButton: false,
                    });
                  }
                });
              }}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6 ">
        <div>
          <h1 className="text-[24px] font-bold">Promotion Management</h1>
          <p className="text-[16px] font-normal mt-2">
            View and manage all your active campaigns in one place.
          </p>
        </div>
        <Button
          type="primary"
          className="bg-primary !text-white hover:!text-secondary hover:!bg-white hover:!border-primary px-[30px] py-[25px] rounded-full text-[18px] font-bold"
          onClick={() => setIsNewCampaignModalVisible(true)}
        >
          New Campaign
        </Button>
      </div>

      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 10 }}
        bordered={false}
        size="small"
        rowClassName="custom-row"
        components={components}
        className="custom-table"
      />

      {/* View Details Modal */}
      <Modal
        visible={isViewModalVisible}
        onCancel={handleCloseViewModal}
        width={700}
        footer={null}
      >
        {selectedRecord && (
          <div>
            <div className="flex flex-row justify-between items-start gap-3 mt-8">
              <img
                src={MarchantIcon}
                alt={selectedRecord.name}
                className="w-214 h-214 rounded-full"
              />
              <div className="flex flex-col gap-2 border border-primary rounded-md p-4 w-full">
                <p className="text-[22px] font-bold text-primary">
                  Customer Profile
                </p>
                <p>
                  <strong>Name:</strong> {selectedRecord.name}
                </p>
                <p>
                  <strong>Business Name:</strong> {selectedRecord.businessName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedRecord.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedRecord.phone}
                </p>
                <p>
                  <strong>Location:</strong> {selectedRecord.location}
                </p>
                <p>
                  <strong>Total Sales:</strong> {selectedRecord.sales}
                </p>
                <p>
                  <strong>Status:</strong> {selectedRecord.status}
                </p>
              </div>
            </div>
            <Table
              columns={columns2}
              dataSource={data}
              rowKey="orderId"
              pagination={{ pageSize: 5 }}
              className="mt-6"
            />
          </div>
        )}
      </Modal>

      {/* New Campaign Modal */}
      <Modal
        visible={isNewCampaignModalVisible}
        onCancel={() => setIsNewCampaignModalVisible(false)}
        footer={null}
        width={1000}
      >
        <NewCampaign
          onSave={handleAddCampaign}
          onCancel={() => setIsNewCampaignModalVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default PromotionManagement;
