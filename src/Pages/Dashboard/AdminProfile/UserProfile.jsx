import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Avatar,
  notification,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

const UserProfile = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [fileList, setFileList] = useState([]);

  // Dummy data (to be used as the default data)
  const dummyData = {
    username: "Md Mijanur Rahman",
    company: "Mijanur Tech Ltd",
    email: "mijan17634@gmail.com",
    contact: "+8801234567890",
    url: "www.example.com",
    address: "1234 Main St, Springfield, USA",
    service: "IT Services",
    aboutUs: "We are a technology company providing IT solutions worldwide.",
    profileImage: "https://i.ibb.co/Qjf2hxsf/images-2.jpg",
  };

  useEffect(() => {
    // Set initial values and the profile image if it exists
    form.setFieldsValue(dummyData);

    if (dummyData.profileImage) {
      setImageUrl(dummyData.profileImage);
      setFileList([
        {
          uid: "-1",
          name: "profile.jpg",
          status: "done",
          url: dummyData.profileImage,
        },
      ]);
    }
  }, [form]);

  // Clean up blob URLs when component unmounts
  useEffect(() => {
    return () => {
      if (imageUrl && imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const onFinish = (values) => {
    const imageFile = fileList.length > 0 ? fileList[0].originFileObj : null;

    console.log("Form Values on Submit:", values);
    console.log("Image File:", imageFile);

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    if (imageFile) {
      formData.append("profileImage", imageFile);
    } else if (imageUrl) {
      formData.append("profileImageUrl", imageUrl);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    message.success("Profile Updated Successfully!");
  };

  const handleImageChange = ({ fileList: newFileList }) => {
    const limitedFileList = newFileList.slice(-1);
    setFileList(limitedFileList);

    if (limitedFileList.length > 0 && limitedFileList[0].originFileObj) {
      const newImageUrl = URL.createObjectURL(limitedFileList[0].originFileObj);

      if (imageUrl && imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }

      setImageUrl(newImageUrl);
    } else {
      setImageUrl(null);
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      notification.error({
        message: "Invalid File Type",
        description: "Please upload an image file.",
      });
    }

    const isLessThan2MB = file.size / 1024 / 1024 < 2;
    if (!isLessThan2MB) {
      notification.error({
        message: "File too large",
        description: "Image must be smaller than 2MB.",
      });
    }

    return isImage && isLessThan2MB;
  };

  return (
    <div className="flex justify-center items-center shadow-xl rounded-lg pt-5 pb-12">
      <Form
        form={form}
        layout="vertical"
        style={{ width: "80%" }}
        onFinish={onFinish}
        encType="multipart/form-data"
      >
        <div className="flex flex-col">
          {/* Profile Image */}
          <div className="col-span-2 flex justify-start items-center gap-5 mb-5">
            <Form.Item style={{ marginBottom: 0 }}>
              <Upload
                name="avatar"
                showUploadList={false}
                action="/upload"
                onChange={handleImageChange}
                beforeUpload={beforeUpload}
                fileList={fileList}
                listType="picture-card"
                maxCount={1}
              >
                {imageUrl ? (
                  <Avatar size={100} src={imageUrl} />
                ) : (
                  <Avatar size={100} icon={<UploadOutlined />} />
                )}
              </Upload>
            </Form.Item>
            <h2 className="text-[24px] font-bold">{dummyData.username}</h2>
          </div>

          {/* Username */}
          <Form.Item
            name="username"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          {/* Company */}
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: "Please enter your company" }]}
          >
            <Input placeholder="Enter your company name" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" disabled />
          </Form.Item>

          {/* Contact */}
          <Form.Item
            name="contact"
            label="Contact Number"
            rules={[{ required: true, message: "Please enter contact number" }]}
          >
            <Input placeholder="Enter your contact number" />
          </Form.Item>

          {/* Website URL */}
          <Form.Item
            name="url"
            label="Website URL"
            rules={[
              { required: true, message: "Please enter your website URL" },
            ]}
          >
            <Input placeholder="Enter your website URL" />
          </Form.Item>

          {/* Address */}
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input placeholder="Enter your address" />
          </Form.Item>

          {/* Service Dropdown */}
          <Form.Item
            name="service"
            label="Service"
            rules={[{ required: true, message: "Please select your service" }]}
          >
            <Select placeholder="Select your service">
              <Option value="IT Services">IT Services</Option>
              <Option value="Consulting">Consulting</Option>
              <Option value="Marketing">Marketing</Option>
              <Option value="Finance">Finance</Option>
            </Select>
          </Form.Item>

          {/* Company About Us */}
          <Form.Item
            name="aboutUs"
            label="Company About Us"
            rules={[
              { required: true, message: "Please describe your company" },
            ]}
          >
            <TextArea rows={4} placeholder="Write about your company" />
          </Form.Item>

          {/* Update Profile Button */}
          <div className="col-span-2 text-end mt-6">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ height: 40 }}
              >
                Save Changes
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default UserProfile;
