import React, { useEffect, useState } from "react";
import { Button, Divider, Form, Input, List, Modal, Table } from "antd";
import { TeamAddDialog } from "../../dialogs/TeamAddDialog";
import { teamTableColumns } from "../../../constants/tableColumns/teamTable";
import { api } from "../../../services";
import { showMessage } from "../../../helpers/notifierHelpers";

const players = [
  {
    gender: "male",
    name: { title: "Mr", first: "Craig", last: "Barnett" },
    email: "craig.barnett@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/men/36.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/36.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/36.jpg",
    },
    nat: "GB",
  },
  {
    gender: "female",
    name: { title: "Madame", first: "Jeannine", last: "Marie" },
    email: "jeannine.marie@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/women/67.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/67.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/67.jpg",
    },
    nat: "CH",
  },
  {
    gender: "female",
    name: { title: "Miss", first: "Mary", last: "Bennett" },
    email: "mary.bennett@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/women/24.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/24.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/24.jpg",
    },
    nat: "GB",
  },
  {
    gender: "female",
    name: { title: "Miss", first: "Madison", last: "Wright" },
    email: "madison.wright@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/women/56.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/56.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/56.jpg",
    },
    nat: "NZ",
  },
  {
    gender: "male",
    name: { title: "Mr", first: "Dean", last: "Mahieu" },
    email: "dean.mahieu@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/men/4.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/4.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/4.jpg",
    },
    nat: "NL",
  },
];

const getRandomRole = () => {
  const roles = ["Нападающий", "Защитник", "Центровой"];
  return roles[Math.floor(Math.random() * roles.length)];
};

const getRandomGender = () => {
  const genders = ["Мужской", "Женский"];
  return genders[Math.floor(Math.random() * genders.length)];
};

const RowDialog = (open: boolean, state: any, handleOk: () => void, handleCancel: () => void) => {
  return (
    <Modal
      centered
      title="Редактировать команду"
      cancelText="Отмена"
      okText="Сохранить"
      visible={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <>
          <Button
            style={{ float: "left", background: "green", borderColor: "green" }}
            onClick={() => handleOk()}
            type="primary"
          >
            Вступить
          </Button>
          {/*<Button danger style={{ float: "left" }}>*/}
          {/*  Удалить*/}
          {/*</Button>*/}
          <Button onClick={() => handleCancel()}>Отмена</Button>
          <Button onClick={() => handleOk()} type="primary">
            Сохранить
          </Button>
        </>
      }
    >
      {state != null && (
        <Form layout="vertical">
          <Form.Item label="Название">
            <Input value={state.name} placeholder="Название" />
          </Form.Item>
          <Form.Item label="Адрес">
            <Input value={state.city} placeholder="Адрес" />
          </Form.Item>
        </Form>
      )}
      <List
        itemLayout="horizontal"
        dataSource={players}
        header={<span>Участники</span>}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              // avatar={<Avatar src={item?.picture?.large ?? undefined} />}
              title={<a href="">{item.name.last + " " + item.name.last}</a>}
              description={
                <div className="d-stack-column">
                  <span children={getRandomRole()} />
                  <span children={"Пол: " + getRandomGender()} />
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export function TeamPage() {
  const [isAddDialogVisible, setIsAddDialogVisible] = useState<boolean>(false);
  const [isRowDialogVisible, setIsRowDialogVisible] = useState<boolean>(false);
  const [rowDialogState, setRowDialogState] = useState<any>(null);

  const [tableFilters, setTableFilters] = useState({
    teamName: "",
    teamAddress: "",
  });

  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleDataFetch = async () => {
    setIsLoading(true);
    const r = await api.team.getAll();
    setIsLoading(false);
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    setData(
      r.map((item, i) => ({
        key: i,
        name: item.name,
        city: item.address,
        players: (item.participants ?? [])?.length,
      }))
    );
  };

  useEffect(() => {
    handleDataFetch();
  }, []);

  return (
    <div className="d-stack-column spacing-2">
      <TeamAddDialog
        isOpen={isAddDialogVisible}
        onSuccess={() => handleDataFetch()}
        onClose={() => setIsAddDialogVisible(false)}
      />
      {RowDialog(
        isRowDialogVisible,
        rowDialogState,
        () => {},
        () => {
          setIsRowDialogVisible(false);
          setRowDialogState(null);
        }
      )}
      <Form style={{ width: "100%" }} className="d-stack spacing-2 no-margin-form" layout="vertical">
        <Form.Item label="Команда">
          <Input
            value={tableFilters.teamName}
            onInput={(event: React.FormEvent<HTMLInputElement>) =>
              setTableFilters({
                ...tableFilters,
                teamName: event.currentTarget.value,
              })
            }
            placeholder="Название команды"
            style={{ width: "250px" }}
          />
        </Form.Item>
        <Form.Item label="Адрес">
          <Input
            value={tableFilters.teamAddress}
            onInput={(event: React.FormEvent<HTMLInputElement>) =>
              setTableFilters({
                ...tableFilters,
                teamAddress: event.currentTarget.value,
              })
            }
            placeholder="Адрес"
            style={{ width: "250px" }}
          />
        </Form.Item>
        <div className="flex-grow-1" />
        <Form.Item label=" ">
          <Button type="primary" onClick={() => setIsAddDialogVisible(true)}>
            Добавить
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Table
        dataSource={data.filter(
          (item) =>
            item.name.toLowerCase().includes(tableFilters.teamName.toLowerCase()) &&
            item.city.toLowerCase().includes(tableFilters.teamAddress.toLowerCase())
        )}
        loading={isLoading}
        columns={teamTableColumns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowDialogState(record);
              setIsRowDialogVisible(true);
            },
          };
        }}
      />
    </div>
  );
}
