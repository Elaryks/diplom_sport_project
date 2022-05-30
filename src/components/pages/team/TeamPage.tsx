import React, { useState } from "react";
import { Button, Divider, Form, Input, List, Modal, Table } from "antd";

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

const AddTeamDialog = (open: boolean, handleOk: () => void, handleCancel: () => void) => {
  return (
    <Modal
      centered
      title="Добавить команду"
      cancelText="Отмена"
      okText="Добавить"
      visible={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout="vertical">
        <Form.Item label="Название">
          <Input placeholder="Название" />
        </Form.Item>
        <Form.Item label="Адрес">
          <Input placeholder="Адрес" />
        </Form.Item>
      </Form>
    </Modal>
  );
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

  const columns = [
    {
      title: "Команда",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Адрес",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Количество участников",
      dataIndex: "players",
      key: "players",
      width: "1%",
    },
  ];

  const dataSource = [
    {
      key: "1",
      name: "Атланта Хоукс",
      city: "Атланта",
      players: "21",
    },
    {
      key: "2",
      name: "Бостон Селтикс",
      city: "Бостон",
      players: "21",
    },
    {
      key: "3",
      name: "Бруклин Нетс",
      city: "Нью-Йорк",
      players: "21",
    },
    {
      key: "4",
      name: "Вашингтон Уизардс",
      city: "Вашингтон",
      players: "21",
    },
    {
      key: "5",
      name: "Денвер Наггетс",
      city: "Денвер",
      players: "21",
    },
    {
      key: "6",
      name: "Милуоки Бакс",
      city: "Милуоки",
      players: "21",
    },
    {
      key: "7",
      name: "Нью-Йорк Никс",
      city: "Нью-Йорк",
      players: "21",
    },
    {
      key: "8",
      name: "Орландо Мэджик",
      city: "Орландо",
      players: "21",
    },
    {
      key: "9",
      name: "Торонто Рэпторс",
      city: "Торонто",
      players: "21",
    },
  ];

  return (
    <div className="d-stack-column spacing-2">
      {AddTeamDialog(
        isAddDialogVisible,
        () => {},
        () => {
          setIsAddDialogVisible(false);
        }
      )}
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
          <Input placeholder="Название соревнования" style={{ width: "250px" }} />
        </Form.Item>
        <Form.Item label="Адрес">
          <Input placeholder="Адрес" style={{ width: "250px" }} />
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
        dataSource={dataSource}
        columns={columns}
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
