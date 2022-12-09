import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Input, notification,Table } from "antd";
import { useForm } from "antd/lib/form/Form";

const Materielles = () => {
    const history=useNavigate();
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "num_imm",
        dataIndex: "num_imm",
        key: "num_imm",
      },
      {
        title: "num_serie",
        dataIndex: "num_serie",
        key: "num_serie",
      },
      {
        title: "marque",
        dataIndex: "marque",
        key: "marque",
      },
    ];
    const [form] = useForm();
    const id = useLocation();
    const x = parseInt(id.pathname.replace("/autorisation_bienssociete/", ""));
    const [index, setIndex] = useState(null);
    const [quantite, setQuantite] = useState(null);
    const test = index===quantite;
    const [data, setData] = useState([]);
    const[loading,setLoading]=useState(true);
  

    const getQuantite = async (id) => {
      axios
        .get(`http://localhost:8800/api/autorisation/societe/quantity/${id}`)
        .then((data) => {
          setQuantite(data.data.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getMaterielle = async (id) => {
      axios
        .get(`http://localhost:8800/api/societe/materielles/${id}`)
        .then((data) => {
          setData(
            data.data.msg.map((row) => ({
              id: row.id,
              num_imm: row.num_imm,
              num_serie: row.num_serie,
              marque: row.marque,
              key:row.id
            }))
          );
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    };
    const getCount=async(id)=>{
         axios.get(`http://localhost:8800/api/societe/count/${id}`).then((data)=>{
           setIndex(data.data.msg)
        }).catch((err)=>{
             console.log(err)
        })
    }
  
    useEffect(() => {
      getMaterielle(x);
      getQuantite(x);
      getCount(x);
      // eslint-disable-next-line
    },[]);
  
    const addData = (values) => {
      const information = {
        ...values,
      };
  
      axios
        .post(`http://localhost:8800/api/societe/materielles/${x}`, information)
        .then((data) => {
          form.resetFields();
          getCount(x);
          notification.open({
            message: "materielle ajouté avec succés",
            type: "success",
          });
  
          getMaterielle(x);
        })
        .catch((err) => {
          notification.open({
            message:
              "erreur verifier vos données",
            type: "error",
          });
        });
    };
  
    return (
      <div>
        <Form form={form} onFinish={addData}>
          <Form.Item required name="num_imm" label=" matricule">
            <Input placeholder="entrer matricule" name="num_imm" required />
          </Form.Item>
          <Form.Item required name="num_serie" label="numero de serie">
            <Input placeholder="entrer numero de serie" name="num_serie" required />
          </Form.Item>
          <Form.Item required name="marque" label="marque">
            <Input placeholder="entrer la marque" name="marque" required />
          </Form.Item>
          <Form.Item>
            {test ? (
              <Button type="primary" htmlType="submit" disabled>
                entrer la materielle n° {index} of {quantite}
              </Button>
            ) : (
              <Button type="primary" htmlType="submit">
                entrer la materielle n° {index} of {quantite}
              </Button>
            )}
          </Form.Item>
        </Form>
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
        <Button type="primary" onClick={()=>{history('/autorisation_rebut')}}>retour vers la page d'acceuil</Button>
      </div>
    );
  };

export default Materielles