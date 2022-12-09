import React, { useState, useEffect } from "react";
import UserDashboard from "../../../../Components/Dashboard";
import { Button, Form, Input, Modal, Table, Space, notification } from "antd";
import axios from "axios";
import { useForm } from "antd/lib/form/Form";
import FormItemLayout from "../../../../Components/FormItemLayout";

const UpdateStage = () => {
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "type_de_stage",
      dataIndex: "type_de_stage",
      key: "type_de_stage",
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
      .patch("http://localhost:8800/api/stages/" + seletectedItem, { ...values })
      .then((data) => {
        notification.success({
          message: "type de stage modifiée avec succés",
        });
        form.resetFields();
        handleCancel();
        getData();
      })
      .catch((err) => {
        notification.open({
          message: "verifier le type de stage doit étre unique",
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
      .get("http://localhost:8800/api/stages")
      .then((data) => {
        setData(
          data.data.msg.map((row) => ({
            id: row.id,
            type_de_stage: row.TypeStage,
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
      .delete(`http://localhost:8800/api/stages/${id}`)
      .then((data) => {
        notification.open({
          message: "type de stage supprimé avec succés",
          type: "success",
        });
        getData();
      })
      .catch((err) => {
        notification.open({
          message: "autorisation sert ce type de stage",
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
            title="modifier type de stage"
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
              <Form.Item label="type de stage" name="typestage" required>
                <Input
                  placeholder="entrer le type de stage "
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
                    modifier type de stage
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

export default UpdateStage;
