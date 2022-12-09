import React, { useState, useEffect } from "react";
import UserDashboard from "../../../../Components/Dashboard";
import { Button, Form, Input, Select, Space, notification } from "antd";
import axios from "axios";
import { useForm } from "antd/lib/form/Form";
import FormItemLayout from "../../../../Components/FormItemLayout";
const { Option } = Select;
const AjoutUser = () => {
  const [form] = useForm();
  const [Fonctions, setFonctions] = useState([]);
  const [Services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const fonctionList = Fonctions.map((e, idx) => {
    return (
      <Option value={e.id} key={idx}>
        {e.designation}
      </Option>
    );
  });
  const serviceList = Services.map((e, idx) => {
    return (
      <Option value={e.id} key={idx}>
        {e.designation}
      </Option>
    );
  });

  const getFonctions = () => {
    axios
      .get("http://localhost:8800/api/functions")
      .then((data) => {
        setFonctions(data.data.msg);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const getServices = () => {
    axios
      .get("http://localhost:8800/api/services")
      .then((data) => {
        setServices(data.data.msg);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const addData = (values) => {
    const information = {
      ...values,
    };

    axios
      .post(`http://localhost:8800/api/users`, information)
      .then((data) => {
        form.resetFields();
        notification.open({
          message: "utilisateur ajouté avec succès",
          type: "success",
        });
      })
      .catch((err) => {
        notification.open({
          message: "vérifier vos données",
          type: "error",
        });
      });
  };
  useEffect(() => {
    getFonctions();
    getServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <UserDashboard btn="add ">
        <Form form={form} {...FormItemLayout} onFinish={addData}>
          <Form.Item label="matricule" name="matricule" required>
            <Input placeholder="entrer nouvelle matricule " name="matricule" />
          </Form.Item>
          <Form.Item label="email" name="email" required>
            <Input placeholder="entrer nouvelle email " name="email" />
          </Form.Item>
          <Form.Item label="nom" name="nom" required>
            <Input placeholder="entrer nouvelle nom " name="nom" />
          </Form.Item>
          <Form.Item label="prenom" name="prenom" required>
            <Input placeholder="entrer nouvelle prenom " name="prenom" />
          </Form.Item>
          <Form.Item label="mot de passe" name="password" required>
            <Input
              placeholder="entrer nouvelle mot de passe "
              name="password"
            />
          </Form.Item>
          <Form.Item
            label="role(Administrateur/Utilisateur)"
            name="role"
            required
          >
            <Input placeholder="entrer nouvelle role " name="role" />
          </Form.Item>
          <Form.Item label="fonction" name={"fonction"} required>
            <Select style={{ width: 120 }} loading={loading}>
              {fonctionList}
            </Select>
          </Form.Item>
          <Form.Item label="service" name={"service"} required>
            <Select style={{ width: 120 }} loading={loading}>
              {serviceList}
            </Select>
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
                ajouter nouveau utilisateur
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </UserDashboard>
    </div>
  );
};

export default AjoutUser;
