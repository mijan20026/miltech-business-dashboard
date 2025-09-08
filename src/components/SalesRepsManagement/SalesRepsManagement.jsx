import React, { useState } from "react";
import {
  Table,
  Select,
  Input,
  Button,
  Modal,
  Form,
  message,
  Tooltip,
} from "antd";
import NewSell from "./NewSell";
import { FaEdit, FaTrash } from "react-icons/fa";

const { Option } = Select;

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

const SalesRepsManagementTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      customerName: "Alice Johnson",
      cardId: "CARD001",
      totalAmount: "$120",
      pointRedeem: 20,
      pointEarned: 12,
      finalAmount: "$100",
      transactionStatus: "Completed",
      date: "2025-08-17",
    },
    {
      id: 2,
      customerName: "John Doe",
      cardId: "CARD002",
      totalAmount: "$80",
      pointRedeem: 10,
      pointEarned: 8,
      finalAmount: "$70",
      transactionStatus: "Pending",
      date: "2025-07-16",
    },
    {
      id: 3,
      customerName: "Michael Brown",
      cardId: "CARD003",
      totalAmount: "$200",
      pointRedeem: 50,
      pointEarned: 20,
      finalAmount: "$150",
      transactionStatus: "Completed",
      date: "2025-08-15",
    },
  ]);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isNewSellPage, setIsNewSellPage] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const handleMonthChange = (month) => setSelectedMonth(month);
  const handleSearchChange = (e) => setSearchText(e.target.value);

  const filteredData = data.filter((item) => {
    const matchesMonth = selectedMonth
      ? new Date(item.date).getMonth() + 1 === parseInt(selectedMonth)
      : true;
    const matchesSearch = searchText
      ? item.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.cardId.toLowerCase().includes(searchText.toLowerCase())
      : true;
    return matchesMonth && matchesSearch;
  });

  const handleNewSellSubmit = (values) => {
    const newEntry = {
      id: data.length + 1,
      customerName: values.customerName,
      cardId: values.cardId,
      totalAmount: `$${values.totalAmount}`,
      pointRedeem: values.pointRedeem,
      pointEarned: values.pointEarned,
      finalAmount: `$${values.finalAmount}`,
      transactionStatus: values.transactionStatus,
      date: values.date.format("YYYY-MM-DD"),
    };
    setData([newEntry, ...data]);
    setIsNewSellPage(false);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this entry?",
      onOk: () => {
        setData(data.filter((item) => item.id !== id));
        message.success("Entry deleted successfully");
      },
    });
  };

  const handleEdit = (record) => {
    setEditingRow(record);
    form.setFieldsValue({
      customerName: record.customerName,
      cardId: record.cardId,
      totalAmount: parseFloat(record.totalAmount.replace("$", "")),
      pointRedeem: record.pointRedeem,
      pointEarned: record.pointEarned,
      finalAmount: parseFloat(record.finalAmount.replace("$", "")),
      transactionStatus: record.transactionStatus,
      date: record.date,
    });
  };

  const handleEditSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        setData(
          data.map((item) =>
            item.id === editingRow.id
              ? {
                  ...item,
                  customerName: values.customerName,
                  cardId: values.cardId,
                  totalAmount: `$${values.totalAmount}`,
                  pointRedeem: values.pointRedeem,
                  pointEarned: values.pointEarned,
                  finalAmount: `$${values.finalAmount}`,
                  transactionStatus: values.transactionStatus,
                  date: values.date,
                }
              : item
          )
        );
        setEditingRow(null);
        message.success("Entry updated successfully");
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  if (isNewSellPage) {
    return (
      <NewSell
        onBack={() => setIsNewSellPage(false)}
        onSubmit={handleNewSellSubmit}
      />
    );
  }

  const columns = [
    { title: "SL", dataIndex: "id", key: "id", align: "center" },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      align: "center",
    },
    { title: "Card ID", dataIndex: "cardId", key: "cardId", align: "center" },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      align: "center",
    },
    {
      title: "Point Redeem",
      dataIndex: "pointRedeem",
      key: "pointRedeem",
      align: "center",
    },
    {
      title: "Point Earned",
      dataIndex: "pointEarned",
      key: "pointEarned",
      align: "center",
    },
    {
      title: "Final Amount",
      dataIndex: "finalAmount",
      key: "finalAmount",
      align: "center",
    },
    {
      title: "Transaction Status",
      dataIndex: "transactionStatus",
      key: "transactionStatus",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          {/* <Button size="small" onClick={() => handleEdit(record)}>
            <FaEdit />
          </Button> */}
          <Tooltip title="Edit">
            <button
              onClick={() => handleEdit(record)}
              className="text-primary hover:text-green-700 text-[17px]"
            >
              <FaEdit />
            </button>
          </Tooltip>
          {/* <Tooltip title="Delete">
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
          </Tooltip> */}
          <Tooltip title="Delete">
            <Button
              type="danger"
              size="small"
              onClick={() => handleDelete(record.id)}
            >
              <FaTrash className="text-red-600" />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full mt-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[24px] font-bold">Today’s Sell</h1>
      </div>

      <div className="flex flex-row items-start justify-between gap-4 mb-4">
        <div className="flex flex-col md:flex-row gap-2">
          <Input
            placeholder="Search by Customer Name or Card ID"
            style={{ width: 300 }}
            value={searchText}
            onChange={handleSearchChange}
            allowClear
          />
          <Select
            placeholder="Filter by Month"
            style={{ width: 200 }}
            onChange={handleMonthChange}
            allowClear
          >
            {Array.from({ length: 12 }, (_, i) => (
              <Option key={i + 1} value={String(i + 1)}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </Option>
            ))}
          </Select>
        </div>
        <Button
          onClick={() => setIsNewSellPage(true)}
          className="bg-primary text-white hover:text-secondary font-bold"
        >
          New Sell
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 10 }}
          bordered={false}
          size="small"
          rowClassName="custom-row"
          className="custom-table"
          scroll={{ x: "max-content" }}
        />
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit Entry"
        visible={!!editingRow}
        onOk={handleEditSubmit}
        onCancel={() => setEditingRow(null)}
        okText="Update"
        width={800}
      >
        <Form form={form} layout="vertical">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-2">
              <Form.Item
                label="Customer Name"
                name="customerName"
                rules={[
                  { required: true, message: "Please input customer name" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Card ID"
                name="cardId"
                rules={[{ required: true, message: "Please input card ID" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Total Amount"
                name="totalAmount"
                rules={[
                  { required: true, message: "Please input total amount" },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="Point Redeem"
                name="pointRedeem"
                rules={[
                  { required: true, message: "Please input point redeem" },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </div>

            {/* Right Column */}
            <div className="flex-1 flex flex-col gap-2">
              <Form.Item
                label="Point Earned"
                name="pointEarned"
                rules={[
                  { required: true, message: "Please input point earned" },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="Final Amount"
                name="finalAmount"
                rules={[
                  { required: true, message: "Please input final amount" },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="Transaction Status"
                name="transactionStatus"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select>
                  <Option value="Completed">Completed</Option>
                  <Option value="Pending">Pending</Option>
                  <Option value="Cancelled">Cancelled</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please input date" }]}
              >
                <Input placeholder="YYYY-MM-DD" />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default SalesRepsManagementTable;
