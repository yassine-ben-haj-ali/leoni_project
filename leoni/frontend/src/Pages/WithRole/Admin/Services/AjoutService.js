import React from "react";
import UserDashboard from "../../../../Components/Dashboard";
import { Button, Form, Input, Space, notification, InputNumber } from "antd";
import axios from "axios";
import { useForm } from "antd/lib/form/Form";
import FormItemLayout from "../../../../Components/FormItemLayout";

const AjoutService = () => {
  const [form] = useForm();

  const addData = (values) => {
    const information = {
      ...values,
    };

    axios
      .post(`http://localhost:8800/api/services`, information)
      .then((data) => {
        form.resetFields();
        notification.open({
          message: "service ajouté avec succés",
          type: "success",
        });
      })
      .catch((err) => {
        notification.open({
          message: "service doit étre unique",
          type: "error",
        });
      });
  };

  return (
    <div>
      <UserDashboard btn="add ">
        <Form form={form} {...FormItemLayout} onFinish={addData}>
          <Form.Item label="designtion" name="designation" required>
            <Input placeholder="entrer la designation " name="designation" />
          </Form.Item>
          <Form.Item label="nombre d'employée" name="nbr_employee" required>
            <InputNumber
              min={1}
              defaultValue={1}
              name="nbr_employee"
              required
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            }}
          >
            <Space>
              <Button type="primary" htmlType="submit">
                ajouter
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </UserDashboard>
    </div>
  );
};

export default AjoutService;
