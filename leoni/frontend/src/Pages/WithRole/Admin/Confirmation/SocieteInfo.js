import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Table } from "antd";
const SocieteInfo = () => {
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
      title: "numéro_serie",
      dataIndex: "numéro_serie",
      key: "numéro_serie",
    },
    {
      title: "marque",
      dataIndex: "marque",
      key: "marque",
    },
  ];
  const history = useNavigate();

  const id = useLocation();
  const x = parseInt(id.pathname.replace("/autorisation_info/", ""));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  var getlocal = localStorage.getItem("token");
  var bearer = localStorage.getItem("token") ? `Bearer ${getlocal}` : "";
  const getMaterielle = async (id) => {
    axios
      .get(`http://localhost:8800/api/societe/materielles/${id}`, {
        headers: {
          authorization: bearer,
        },
      })
      .then((data) => {
        setData(
          data.data.msg.map((row) => ({
            id: row.id,
            matricule: row.num_imm,
            numéro_serie: row.num_serie,
            marque: row.marque,
            key: row.id,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getMaterielle(x);
    // eslint-disable-next-line
  }, []);
  return (
    <div>
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
      <Button
        type="primary"
        onClick={() => {
          history("/autorisation_rebut");
        }}
      >
        retour vers la page d'acceuil
      </Button>
    </div>
  );
};

export default SocieteInfo;
