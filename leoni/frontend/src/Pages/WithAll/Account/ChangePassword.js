import React from 'react';
import axios from 'axios';
import UserDashboard from '../../../Components/Dashboard';
import { Form, Input, Button, Space, notification } from "antd";
import { useForm } from "antd/lib/form/Form";
import FormItemLayout from '../../../Components/FormItemLayout';

const ChangePassword = () => {
    const [form] = useForm();
    const addData = (values) => {
      if(values.confirmpass===values.newpass){
      const information = {
         passnow:values.passnow,
         newpass:values.newpass
      };
      axios
        .post(`http://localhost:8800/api/account`, information)
        .then((data) => {
          form.resetFields();
          notification.open({
            message: "mot de passe changée avec succés",
            type: "success",
          });
        })
        .catch((err) => {
          notification.open({
            message:
              "ancien mot de passe incorrect ",
            type: "error",
          });
        });
    }else{
      notification.open({
        message:
          "mot de passe et confirmation mot de passe doit étre identique",
        type: "error",
      }); 
    }
      
    };
    return (
      <div>
        <UserDashboard btn="add ">
          <Form form={form} {...FormItemLayout} onFinish={addData}>
            <Form.Item label="ancien mot de passe " name="passnow" required>
              <Input placeholder="entrer ancien mot de passe " name="passnow" />
            </Form.Item>
            <Form.Item label="nouveau mot de passe " name="newpass" required>
              <Input placeholder="entrer nouveau mot de passe " name="newpass" />
            </Form.Item>
            <Form.Item label="confirmation mot de passe " name="confirmpass" required>
              <Input placeholder="entrer confirmation mot de passe " name="newpass" />
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
                  changer
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </UserDashboard>
      </div>
    );
  };

export default ChangePassword