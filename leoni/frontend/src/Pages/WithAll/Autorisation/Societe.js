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
  InputNumber,
  Table,
  Select,
  notification,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { useNavigate } from "react-router-dom";
import FormItemLayout from "../../../Components/FormItemLayout";
const { Option } = Select;

const Societe = () => {
    const history=useNavigate();
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
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
        title: "tronsporteur",
        dataIndex: "tronsporteur",
        key: "tronsporteur",
      },
      {
        title: "type_de_sortie",
        dataIndex: "type_de_sortie",
        key: "type_de_sortie",
      },
      {
        title: "num_mise_rebut",
        dataIndex: "num_mise_rebut",
        key: "num_mise_rebut",
      },
      {
        title: "date_sortie",
        dataIndex: "date_sortie",
        key: "date_sortie",
      },
      {
        title: "date_retour_prevue",
        dataIndex: "date_retour_prevue",
        key: "date_retour_prevue",
      },
      {
        title: "responsable_retour",
        dataIndex: "responsable_retour",
        key: "responsable_retour",
      },
      {
        title: "nature_bien",
        dataIndex: "nature_bien",
        key: "nature_bien",
      },
      {
        title: "état",
        dataIndex: "état",
        key: "état",
      },
      {
        title: "action",
        key: "action",
        render: (fila) => (
          <>
           <Button type="primary" onClick={()=>{history(`/autorisation_bienssociete/${fila.id}`)}}>
                afficher
           </Button>
          </>
        ),
      },
    ];
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = useForm();
    const [sortie, setSortie] = useState([]);
    const [loading, setLoading] = useState(true);
    const[data,setData]=useState([]);
    const sortieList =
      sortie.length > 0 &&
      sortie.map((e, idx) => {
        return (
          <Option value={e.id} key={idx}>
            {e.TypeSortie}
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
        .get("http://localhost:8800/api/sorties")
        .then((data) => {
          setLoading(false);
          setSortie(data.data.msg);
        })
        .catch((err) => {
          setLoading(false);
        });
    };
    const getData = () => {
      axios
        .get("http://localhost:8800/api/autorisation/mysociete")
        .then((data) => {
          setData(
            data.data.msg.map((row) => ({
              id: row.id,
              quantite: row.quantite,
              destination: row.destination,
              tronsporteur: row.tronsporteur,
              type_de_sortie: row.type_sortie,
              num_mise_rebut: row.num_mise_rebut,
              date_sortie: row.date_sortie,
              date_retour_prevue: row.date_retour_prevue,
              responsable_retour: row.responsable_retour,
              nature_bien: row.nature_bien,
              état:row.etat,
              key: row.id,
            }))
          );
        })
        .catch((err) => {});
    };
    const addDataAutorisation = (values) => {
      const information = {
        ...values,
      };
      axios
        .post(`http://localhost:8800/api/autorisation/societe`, information)
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
      fetch();
      getData();
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
            title="autorisation"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Form form={form} {...FormItemLayout} onFinish={addDataAutorisation}>
              <Form.Item label="nature_bien" name="nature_bien" required>
                <Input
                  placeholder="entrer la nature de biens  "
                  name="nature"
                  required
                />
              </Form.Item>{" "}
              <Form.Item label="quantite" name="quantite" required>
                <InputNumber
                  placeholder="entrer la quantite de biens  "
                  name="quantite"
                  required
                />
              </Form.Item>
              <Form.Item label="destination" name="destination" required>
                <Input
                  placeholder="entrer la destination de biens  "
                  name="destination"
                  required
                />
              </Form.Item>{" "}
              <Form.Item label="tronsporteur" name="tronsporteur" required>
                <Input
                  placeholder="entrer la tronsporteur de biens  "
                  name="tronsporteur"
                  required
                />
              </Form.Item>{" "}
              <Form.Item label="num_mise_rebut" name="num_mise_rebut" required>
                <Input
                  placeholder="entrer la num_mise_rebut de biens  "
                  name="num_mise_rebut"
                  required
                />
              </Form.Item>
              <Form.Item label="type_sortie" name={"type_sortie"} required>
                <Select style={{ width: 120 }} loading={loading}>
                  {sortieList}
                </Select>
              </Form.Item>
              <Form.Item
                required
                name="date_retour_prevue"
                label="date_retour_prevue"
              >
                <DatePicker showTime />
              </Form.Item>
              <Form.Item required name="date_sortie" label="date_sortie">
                <DatePicker showTime />
              </Form.Item>
              <Form.Item
                label="responsable_retour"
                name="responsable_retour"
                required
              >
                <Input
                  placeholder="entrer la responsable_retour de biens  "
                  name="responsable_retour"
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
  

export default Societe