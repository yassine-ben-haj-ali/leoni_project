import React from "react";
import UserDashboard from "../../../../Components/Dashboard";
import { Button, Form, Input, Space, notification } from "antd";
import axios from "axios";
import { useForm } from "antd/lib/form/Form";
import FormItemLayout from "../../../../Components/FormItemLayout";

const AjoutFunction = () => {
    const [form] = useForm();

    const addData = (values) => {
      const information = {
        ...values,
      };
      axios
        .post(`http://localhost:8800/api/functions`, information)
        .then((data) => {
          form.resetFields();
          notification.open({
            message: "fonction ajouté avec succés",
            type: "success",
          });
        })
        .catch((err) => {
          notification.open({
            message:"fonction doit étre unique",
            type: "error",
          });
        });
    };
  
    return (
      <div>
        <UserDashboard btn="add ">
       
            <Form form={form} {...FormItemLayout} onFinish={addData}>
              <Form.Item label="designtion" name="designation" required>
                <Input
                  placeholder="entrer nouvelle fonction "
                  name="designation"
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

export default AjoutFunction