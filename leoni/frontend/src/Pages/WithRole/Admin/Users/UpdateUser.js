import React, { useState, useEffect } from "react";
import UserDashboard from "../../../../Components/Dashboard";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Space,
  notification,
} from "antd";
import axios from "axios";
import { useForm } from "antd/lib/form/Form";
import FormItemLayout from "../../../../Components/FormItemLayout";
const { Option } = Select;

const UpdateUser = () => {
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "matricule",
      dataIndex: "matricule",
      key: "matricule",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "prenom",
      dataIndex: "prenom",
      key: "prenom",
    },
    {
      title: "role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "identifiant_fonction",
      dataIndex: "identifiant_fonction",
      key: "identifiant_fonction",
    },
    {
      title: "identifiant_service",
      dataIndex: "identifiant_service",
      key: "identifiant_service",
    },
    {
      title: "supprimer",
      key: "supprimer",
      render: (fila) => (
        <>
          <Button danger type="primary" onClick={() => deleteData(fila.id)}>
            supprimer
          </Button>
        </>
      ),
    },
    {
      title: "modifier",
      key: "modifier",
      render: (fila) => (
        <>
          <Button
            type="primary"
            style={{ background: "green", border: "0px" }}
            onClick={() => showModal(fila.id)}
          >
            modifier
          </Button>
        </>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const [form] = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [seletectedItem, setSeletectedItem] = useState(null);
  const [Fonctions, setFonctions] = useState([]);
  const [Services, setServices] = useState([]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
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

  const handleConfirmReservation = (values) => {
    axios
      .patch("http://localhost:8800/api/users/" + seletectedItem, { ...values })
      .then((data) => {
        notification.success({ message: "utilisateur modifié avec succés" });
        handleCancel();
        form.resetFields();
        getData();
      })
      .catch((err) => {
        notification.open({
          message: "vérifier vos informations",
          type: "error",
        });
        handleCancel();
        form.resetFields();
        getData();
      });
  };

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

  const showModal = (key) => {
    setIsModalVisible(!isModalVisible);
    setSeletectedItem(key ? key : null);
    if (!key) {
      getData();
    }
  };

  const getData = () => {
    axios
      .get("http://localhost:8800/api/users")
      .then((data) => {
        setData(
          data.data.msg.map((row) => ({
            id: row.id,
            matricule: row.matricule,
            nom: row.nom,
            prenom: row.prenom,
            email: row.email,
            role: row.Role,
            identifiant_fonction: row.fonctionId,
            identifiant_service: row.serviceId,
            key: row.id,
          }))
        );
      })
      .catch((err) => {});
  };

  const deleteData = (id) => {
    axios
      .delete(`http://localhost:8800/api/users/${id}`)
      .then((data) => {
        notification.open({
          message: "utilisateur supprimé avec succès",
          type: "success",
        });
        getData();
      })
      .catch((err) => {
        notification.open({
          message: "vérifier vos données",
          type: "error",
        });
      });
  };
  useEffect(() => {
    getData();
    getFonctions();
    getServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <UserDashboard btn="add ">
        {seletectedItem && (
          <Modal
            title="modifier utilisateur"
            visible={isModalVisible}
            onOk={handleOk}
            key={seletectedItem}
            footer={null}
            onCancel={handleCancel}
          >
            <Form
              form={form}
              {...FormItemLayout}
              onFinish={handleConfirmReservation}
            >
              <Form.Item label="email" name="email">
                <Input placeholder="entrer nouvelle email " name="email" />
              </Form.Item>
              <Form.Item label="nom" name="nom" required>
                <Input placeholder="entrer nouvelle nom " name="name" />
              </Form.Item>
              <Form.Item label="prenom" name="prenom" required>
                <Input placeholder="entrer nouvelle prenom " name="prenom" />
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
                    modifier utilisateur
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Modal>
        )}
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

export default UpdateUser;
