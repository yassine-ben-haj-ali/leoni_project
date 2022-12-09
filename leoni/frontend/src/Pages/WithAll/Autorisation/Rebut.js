import React, { useState, useEffect } from "react";
import UserDashboard from "../../../Components/Dashboard";
import axios from "axios";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Space,
  Modal,
  Table,
  notification,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import FormItemLayout from "../../../Components/FormItemLayout";
const Rebut = () => {
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "nature_investissement",
      dataIndex: "nature_investissement",
      key: "nature_investissement",
    },
    {
      title: "caracteristiques",
      dataIndex: "caracteristiques",
      key: "caracteristiques",
    },
    {
      title: "montant_acquisition",
      dataIndex: "montant_acquisition",
      key: "montant_acquisition",
    },
    {
      title: "centre_cout",
      dataIndex: "centre_cout",
      key: "centre_cout",
    },
    {
      title: "perte",
      dataIndex: "perte",
      key: "perte",
    },
    {
      title: "date_acquisition",
      dataIndex: "date_acquisition",
      key: "date_acquisition",
    },
    {
      title: "date_sortie",
      dataIndex: "date_sortie",
      key: "date_sortie",
    },
    {
      title: "cause_rebut",
      dataIndex: "cause_rebut",
      key: "cause_rebut",
    },
    {
      title: "état",
      key: "état",
      dataIndex:"état"
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = useForm();
  const [data, setData] = useState([]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getData = () => {
    axios
      .get("http://localhost:8800/api/autorisation/myrebut")
      .then((data) => {
        setData(
          data.data.msg.map((row) => ({
            id: row.id,
            nature_investissement: row.nature_investissement,
            caracteristiques: row.caracteristiques,
            montant_acquisition: row.montant_acquisition,
            centre_cout: row.centre_cout,
            perte: row.perte,
            date_acquisition: row.date_acquisition,
            date_sortie: row.date_sortie,
            cause_rebut: row.cause_rebut,
            key: row.id,
            état:row.etat
          }))
        );
        setLoading(false);
      }
      
      )
      .catch((err) => {
        setLoading(false);
      });
  };
  const addData = (values) => {
    const information = {
      ...values,
    };
    axios
      .post(`http://localhost:8800/api/autorisation/rebut`, information)
      .then((data) => {
        form.resetFields();
        setIsModalVisible(false);
        notification.open({
          message: data.data.msg,
          type: "success",
        });
        getData();
      })
      .catch((err) => {
        notification.open({
          message: err.response.data.message,
          type: "error",
        });
      });
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div>
      <UserDashboard>
        <Button
          type="primary"
          onClick={showModal}
          style={{
            marginBottom: "1em",
          }}
        >
        ajouter nouvelle autorisation
        </Button>
        <Modal
          title="autorisation"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} {...FormItemLayout} onFinish={addData}>
            <Form.Item label="nature_investissement" name="nature_investissement"required>
              <Input
                placeholder="enter nature d'investissement "
                name="nature_investissement"
                required
              />
            </Form.Item>
            <Form.Item label="caracteristiques" name="caracteristiques"required>
              <Input
                placeholder="enter caracteristiques "
                name="caracteristiques"
                required
              />
            </Form.Item>
            <Form.Item label="montant_acquisition" name="montant_acquisition" required>
              <Input
                placeholder="enter montant acquisition "
                name="montant_acquisition"
                required
              />
            </Form.Item>
            <Form.Item required label="centre_cout" name="centre_cout">
              <Input
                placeholder="enter centre cout "
                name="centre_cout"
                required
              />
            </Form.Item>
            <Form.Item label="perte" name="perte" required>
              <Input placeholder="entrer perte " name="perte" required />
            </Form.Item>
            <Form.Item
              required
              name="date_acquisition"
              label="Date d'acquisition"
            >
              <DatePicker showTime />
            </Form.Item>
            <Form.Item required name="date_sortie" label="Date de sortie">
              <DatePicker showTime />
            </Form.Item>
            <Form.Item label="cause_rebut" name="cause_rebut" required>
              <Input
                placeholder="entrer la cause de rebut "
                name="cause_rebut"
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
        </Modal>
        <Table
        loading={loading}
          bordered
          dataSource={data}
          columns={columns}
          scroll={{ x: true }}
          pagination={{
            size: "small",
            position: ["topRight"],
          }}
        />
      </UserDashboard>
    </div>
  );
};

export default Rebut;