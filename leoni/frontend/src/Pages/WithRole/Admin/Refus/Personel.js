import React, { useState, useEffect } from "react";
import { Button, Tag, notification, Table, Modal } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import UserDashboard from "../../../../Components/Dashboard";
import axios from "axios";
const Personel = () => {
  const [data, setData] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [seletectedItem, setSeletectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleConfirmModal = (id) => {
    setConfirmModal(!confirmModal);
    setSeletectedItem(id != null ? id : null);
    if (id) {
      getData();
    }
  };

  const handleConfirm = () => {
    if (seletectedItem != null) {
      axios
        .patch("http://localhost:8800/api/autorisation/personel/" + seletectedItem, {
          etat: "Refuse"
        })
        .then((data) => {
          notification.success({ message: "autorisation refusé" });
          toggleConfirmModal();
          getData();
        })
        .catch((err) => {});
    }
    toggleConfirmModal();
  };
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
      title: "userId",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "état",
      key: "état",
      render: (fila) => (
        <>
          <Tag
            style={{
              padding: "0.5em",
            }}
            icon={<SyncOutlined spin />}
            color="processing"
          >
            En attente
          </Tag>
        </>
      ),
    },
    {
      title: "action",
      key: "action",
      render: (action) => (
        <>
          <Button type="primary" onClick={() => toggleConfirmModal(action.id)}>
            réfuser
          </Button>
        </>
      ),
    },
  ];

  const getData = () => {
    axios
      .get("http://localhost:8800/api/autorisation/personel/?status=En_attente")
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
            userId: row.userId,
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
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <UserDashboard>
      <div>
        {confirmModal && (
          <Modal
            title={`refus l'autorisation n° ${seletectedItem}`}
            visible={confirmModal}
            onOk={handleConfirm}
            onCancel={() => toggleConfirmModal()}
            okText="refuser"
            cancelText="Cancel"
            okButtonProps={{
              type: "primary",
            }}
          >
            Vous êtes sûr de refuser cette autorisation ??
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
      </div>
    </UserDashboard>
  );
};

export default Personel;
