import React from "react";
import UserDashboard from "../../../../Components/Dashboard";
import { Button, Form, Input, Space, notification} from "antd";
import axios from "axios";
import { useForm } from "antd/lib/form/Form";
import FormItemLayout from "../../../../Components/FormItemLayout";

const AjoutStage = () => {
  const [form] = useForm();

  const addData = (values) => {
    const information = {
      ...values,
    };

    axios
      .post(`http://localhost:8800/api/stages`, information)
      .then((data) => {
        form.resetFields();
        notification.open({
          message: "type de stage ajouté avec succés",
          type: "success",
        });
      })
      .catch((err) => {
        notification.open({
          message: "type de stage existe deja",
          type: "error",
        });
      });
  };

  return (
    <div>
      <UserDashboard btn="add ">
        <Form form={form} {...FormItemLayout} onFinish={addData}>
          <Form.Item label="type de stage" name="typestage" required>
            <Input
              placeholder="entrer nouvelle type de stage "
              name="typestage"
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

export default AjoutStage;
