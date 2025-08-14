import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Tooltip, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import MarchantIcon from "../../assets/marchant.png";
import { EditOutlined } from "@ant-design/icons";

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

const LoginCredentials = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      image: "https://i.ibb.co/8gh3mqPR/Ellipse-48-1.jpg",
      email: "example@email.com",
      retailer: 5,
      sales: "$300",
      status: "Active",
      phone: "+1234567890",
      location: "New York",
      businessName: "Alice's Store",
    },
    {
      id: 2,
      name: "John Doe",
      image: "https://i.ibb.co/8gh3mqPR/Ellipse-48-1.jpg",
      email: "john@email.com",
      retailer: 3,
      sales: "$500",
      status: "Inactive",
      phone: "+9876543210",
      location: "California",
      businessName: "John's Shop",
    },
    {
      id: 3,
      name: "John Doe",
      image: "https://i.ibb.co/8gh3mqPR/Ellipse-48-1.jpg",
      email: "john@email.com",
      retailer: 3,
      sales: "$500",
      status: "Active",
      phone: "+9876543210",
      location: "California",
      businessName: "John's Shop",
    },
  ]);

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [viewForm] = Form.useForm();

  // Add Role Modal state
  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);
  const [roleForm] = Form.useForm();

  const navigate = useNavigate();

  const showViewModal = (record) => {
    setSelectedRecord(record);
    viewForm.setFieldsValue(record); // Pre-fill form with selected data
    setIsViewModalVisible(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalVisible(false);
    setSelectedRecord(null);
  };

  // Handle update save
  const handleUpdateRecord = () => {
    viewForm.validateFields().then((values) => {
      setData((prev) =>
        prev.map((item) =>
          item.id === selectedRecord.id ? { ...item, ...values } : item
        )
      );
      Swal.fire({
        title: "Updated!",
        text: "Merchant details have been updated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      setIsViewModalVisible(false);
    });
  };

  // Handle role submission
  const handleAddRole = () => {
    roleForm.validateFields().then((values) => {
      console.log("New Role:", values.roleName);
      Swal.fire({
        title: "Role Added!",
        text: `Role "${values.roleName}" has been successfully added.`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      roleForm.resetFields();
      setIsRoleModalVisible(false);
    });
  };

  const columns = [
    { title: "SL", dataIndex: "id", key: "id", align: "center" },
    { title: "Owner Name", dataIndex: "name", key: "name", align: "center" },
    {
      title: "Business Name",
      dataIndex: "businessName",
      key: "businessName",
      align: "center",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    { title: "Email", dataIndex: "email", key: "email", align: "center" },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      align: "center",
    },
    { title: "Total Sales", dataIndex: "sales", key: "sales", align: "center" },
    { title: "Status", dataIndex: "status", key: "status", align: "center" },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div
          className="flex gap-0 justify-between align-middle py-[7px] px-[15px] border border-primary rounded-md"
          style={{ alignItems: "center" }}
        >
          <Tooltip title="View & Update Details">
            <button
              onClick={() => showViewModal(record)}
              className="text-primary hover:text-green-700 text-xl"
            >
              <EditOutlined />
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
              backgroundColor: record.status === "Active" ? "#3fae6a" : "gray",
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
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-[24px] font-bold">Login Credentials</h1>
          <p className="text-[16px] font-normal mt-2">
            Access your account securely with your login credentials.
          </p>
        </div>
        <div className="flex gap-5">
          <Button
            type="primary"
            onClick={() => navigate("/login-credentials/create")}
            className="bg-primary !text-white hover:!text-secondary hover:!bg-white hover:!border-primary px-[30px] py-[25px] rounded-full text-[18px] font-bold"
          >
            Add New User
          </Button>
          <Button
            type="primary"
            onClick={() => setIsRoleModalVisible(true)}
            className="bg-primary !text-white hover:!text-secondary hover:!bg-white hover:!border-primary px-[30px] py-[25px] rounded-full text-[18px] font-bold"
          >
            Add New Role
          </Button>
        </div>
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

      {/* View & Update Modal */}
      <Modal
        visible={isViewModalVisible}
        onCancel={handleCloseViewModal}
        width={700}
        onOk={handleUpdateRecord}
        okText="Save Changes"
      >
        {selectedRecord && (
          <div className="flex flex-row items-center justify-between gap-3 mt-8 mb-8">
            <div className="flex flex-col gap-2 w-full border border-primary rounded-md p-4">
              <p className="text-[22px] font-bold text-primary">
                Login Credentials
              </p>
              <Form form={viewForm} layout="vertical">
                <Form.Item name="name" label="Name">
                  <Input />
                </Form.Item>
                <Form.Item name="businessName" label="Business Name">
                  <Input />
                </Form.Item>
                <Form.Item name="email" label="Email">
                  <Input />
                </Form.Item>
                <Form.Item name="phone" label="Phone">
                  <Input />
                </Form.Item>
                <Form.Item name="location" label="Location">
                  <Input />
                </Form.Item>
                <Form.Item name="sales" label="Total Sales">
                  <Input />
                </Form.Item>
              </Form>
            </div>
          </div>
        )}
      </Modal>

      {/* Add New Role Modal */}
      <Modal
        title="Add New Role"
        visible={isRoleModalVisible}
        onCancel={() => setIsRoleModalVisible(false)}
        onOk={handleAddRole}
        okText="Add Role"
      >
        <Form form={roleForm} layout="vertical">
          <Form.Item
            name="roleName"
            label="Role Name"
            rules={[{ required: true, message: "Please enter role name" }]}
          >
            <Input placeholder="Enter role name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LoginCredentials;
