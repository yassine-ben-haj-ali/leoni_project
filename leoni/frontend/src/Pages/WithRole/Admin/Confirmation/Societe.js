import React, { useState, useEffect } from "react";
import { Button, Tag, notification, Table, Modal } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import UserDashboard from "../../../../Components/Dashboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Societe = () => {
  const [data, setData] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [seletectedItem, setSeletectedItem] = useState(null);
  const history = useNavigate();

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
        .patch("http://localhost:8800/api/autorisation/societe/" + seletectedItem, {
          etat: "Accepte",
        })
        .then((data) => {
          notification.success({ message: "autorisation accepté" });
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
      title: "type_sortie",
      dataIndex: "type_sortie",
      key: "type_sortie",
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
            accepter
          </Button>
        </>
      ),
    },
    {
      title: "affichage",
      key: "affichage",
      render: (action) => (
        <>
          <Button
            type="primary"
            htmlType="button"
            style={{ background: "green", border: "0px" }}
            onClick={() => {
              history(`/autorisation_info/${action.id}`);
            }}
          >
            afficher tous
          </Button>
        </>
      ),
    },
  ];

  const getData = () => {
    axios
      .get("http://localhost:8800/api/autorisation/societe/?status=En_attente")
      .then((data) => {
        setData(
          data.data.msg.map((row) => ({
            id: row.id,
            quantite: row.quantite,
            destination: row.destination,
            tronsporteur: row.tronsporteur,
            type_sortie: row.type_sortie,
            num_mise_rebut: row.num_mise_rebut,
            date_sortie: row.date_sortie,
            date_retour_prevue: row.date_retour_prevue,
            responsable_retour: row.responsable_retour,
            nature_bien: row.nature_bien,
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
            title={`accepte autorisation n° ${seletectedItem}`}
            visible={confirmModal}
            onOk={handleConfirm}
            onCancel={() => toggleConfirmModal()}
            okText="accepte"
            cancelText="Cancel"
            okButtonProps={{
              type: "primary",
            }}
          >
            Vous êtes sûr d'accepter cette autorisation ??
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
export default Societe;
