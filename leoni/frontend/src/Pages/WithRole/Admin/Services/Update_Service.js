import React, { useState, useEffect } from "react";
import UserDashboard from "../../../../Components/Dashboard";
import {
  Button,
  Form,
  Input,
  Modal,
  Table,
  Space,
  notification,
  InputNumber,
} from "antd";
import axios from "axios";
import { useForm } from "antd/lib/form/Form";
import FormItemLayout from "../../../../Components/FormItemLayout";

const UpdateService = () => {
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "nbr_employee",
      dataIndex: "nbr_employee",
      key: "nbr_employee",
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [seletectedItem, setSeletectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [form] = useForm();
  const handleConfirmReservation = (values) => {
    axios
      .patch("http://localhost:8800/api/services/" + seletectedItem, { ...values })
      .then((data) => {
        notification.success({ message: "service modifié avec succés" });
        form.resetFields();
        handleCancel();
        getData();
      })
      .catch((err) => {
        notification.open({
          message: "vérifier vos données designation doit étre unique",
          type: "error",
        });
        form.resetFields();
        handleCancel();
        getData();
      });
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
      .get("http://localhost:8800/api/services")
      .then((data) => {
        setData(
          data.data.msg.map((row) => ({
            id: row.id,
            designation: row.designation,
            nbr_employee: row.nbr_employee,
            key: row.id,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const deleteData = (id) => {
    axios
      .delete(`http://localhost:8800/api/services/${id}`)
      .then((data) => {
        notification.open({
          message: "service supprimé avec succés",
          type: "success",
        });
        getData();
      })
      .catch((err) => {
        notification.open({
          message: "service utilisée",
          type: "error",
        });
      });
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <UserDashboard btn="add ">
        {seletectedItem && (
          <Modal
            title="modifier service"
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
              <Form.Item label="designtion" name="designation">
                <Input
                  placeholder="entrer la designation "
                  name="designation"
                />
              </Form.Item>
              <Form.Item label="nombre d'employée" name="nbr_employee">
                <InputNumber min={1} defaultValue={1} name="nbr_employee" />
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
                    modifier service
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Modal>
        )}
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
export default UpdateService;
