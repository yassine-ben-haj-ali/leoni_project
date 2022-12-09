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
  Select,
  notification,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import FormItemLayout from "../../../Components/FormItemLayout";
const { Option } = Select;

const Personel = () => {
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "nature",
      dataIndex: "nature",
      key: "nature",
    },
    {
      title: "quantite",
      dataIndex: "quantite",
      key: "quantite",
    },
    {
      title: "destination",
      dataIndex: "destination",
      key: "destination",
    },
    {
      title: "nom_tronsporteur",
      dataIndex: "nom_tronsporteur",
      key: "nom_tronsporteur",
    },
    {
      title: "prenom_tronsporteur",
      dataIndex: "prenom_tronsporteur",
      key: "prenom_tronsporteur",
    },
    {
      title: "institue",
      dataIndex: "institue",
      key: "institue",
    },
    {
      title: "type_stage",
      dataIndex: "type_stage",
      key: "type_stage",
    },
    {
      title: "date_stage",
      dataIndex: "date_stage",
      key: "date_stage",
    },
    {
      title: "date_debut",
      dataIndex: "date_debut",
      key: "date_debut",
    },
    {
      title: "date_fin",
      dataIndex: "date_fin",
      key: "date_fin",
    },
    {
      title: "état",
      dataIndex: "état",
      key: "état",
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = useForm();
  const [data, setData] = useState([]);
  const [Stage, setStage] = useState([]);
  const [loading, setLoading] = useState(true);
  const stageList =
    Stage.length > 0 &&
    Stage.map((e, idx) => {
      return (
        <Option value={e.id} key={idx}>
          {e.TypeStage}
        </Option>
      );
    });

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetch = () => {
    axios
      .get("http://localhost:8800/api/stages")
      .then((data) => {
        setLoading(false);
        setStage(data.data.msg);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const getData = () => {
    axios
      .get("http://localhost:8800/api/autorisation/mypersonel")
      .then((data) => {
        setData(
          data.data.msg.map((row) => ({
            id: row.id,
            nature: row.nature,
            quantite: row.quantite,
            destination: row.destination,
            nom_tronsporteur: row.nom_tronsporteur,
            prenom_tronsporteur: row.prenom_tronsporteur,
            institue: row.institue,
            type_stage: row.type_stage,
            date_stage: row.date_stage,
            date_debut: row.date_debut,
            date_fin: row.date_fin,
            key: row.id,
            état: row.etat,
          }))
        );
      })
      .catch((err) => {});
  };
  const addData = (values) => {
    const information = {
      ...values,
      quantite: parseInt(values.quantite),
    };
    axios
      .post(`http://localhost:8800/api/autorisation/personel`, information)
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
        console.log(err);
        notification.open({
          message: err.response.data.message,
          type: "error",
        });
      });
  };
  useEffect(() => {
    getData();
    fetch();
    // eslint-disable-next-line
  }, []);
  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div>
      <UserDashboard btn="add Camion">
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
          title="autorisations"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} {...FormItemLayout} onFinish={addData}>
            <Form.Item label="nature" name="nature" required>
              <Input placeholder="entrer la nature " name="nature" required />
            </Form.Item>
            <Form.Item label="quantite" name="quantite" required>
              <Input
                placeholder="entrer la quantite "
                name="quantite"
                required
              />
            </Form.Item>
            <Form.Item label="destination" name="destination" required>
              <Input
                placeholder="entrer la destination "
                name="destination"
                required
              />
            </Form.Item>
            <Form.Item
              required
              label="nom_tronsporteur"
              name="nom_tronsporteur"
            >
              <Input
                placeholder="entrer le nom du tronsporteur "
                name="nom_tronsporteur"
                required
              />
            </Form.Item>
            <Form.Item
              label="prenom_tronsporteur"
              name="prenom_tronsporteur"
              required
            >
              <Input
                placeholder="entrer le prenom du tronsporteur "
                name="prenom_tronsporteur"
                required
              />
            </Form.Item>
            <Form.Item label="institue" name="institue" required>
              <Input
                placeholder="entrer l'institue "
                name="institue"
                required
              />
            </Form.Item>
            <Form.Item label="type de stage" name={"type_stage"} required>
              <Select style={{ width: 120 }} loading={loading}>
                {stageList}
              </Select>
            </Form.Item>
            <Form.Item required name="date_stage" label="date_stage">
              <DatePicker showTime />
            </Form.Item>
            <Form.Item required name="date_debut" label="Date de debut">
              <DatePicker showTime />
            </Form.Item>
            <Form.Item required name="date_fin" label="Date de fin">
              <DatePicker showTime />
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

export default Personel;
