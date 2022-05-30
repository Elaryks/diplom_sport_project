import React, { useState } from "react";
import { Button, Form, Input, Modal, Table } from "antd";

const AddRoomDialog = (open: boolean, handleOk: () => void, handleCancel: () => void) => {
  return (
    <Modal
      centered
      title="Добавить место проведения"
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
        <Form.Item label="Контактные данные">
          <Input placeholder="Контактные данные" />
        </Form.Item>
        <Form.Item label="Вместимость">
          <Input placeholder="Вместимость" />
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
      title="Редактировать место проведения"
      cancelText="Отмена"
      okText="Сохранить"
      visible={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <>
          <Button danger style={{ float: "left" }}>
            Удалить
          </Button>
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
          <Form.Item label="Контактные данные">
            <Input value={state.contact} placeholder="Контактные данные" />
          </Form.Item>
          <Form.Item label="Вместимость">
            <Input value={state.people} placeholder="Вместимость" />
          </Form.Item>
          <Form.Item label="Адрес">
            <Input value={state.city} placeholder="Адрес" />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export function RoomPage() {
  const [isAddDialogVisible, setIsAddDialogVisible] = useState<boolean>(false);
  const [isRowDialogVisible, setIsRowDialogVisible] = useState<boolean>(false);
  const [rowDialogState, setRowDialogState] = useState<any>(null);

  const columns = [
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Вместимость",
      dataIndex: "people",
      key: "people",
    },
    {
      title: "Адрес",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Контактные данные",
      dataIndex: "contact",
      key: "contact",
    },
    // {
    //   title: "Действия",
    //   key: "operation",
    //   width: 100,
    //   render: () => <a>Удалить</a>,
    //   onCell: () => {
    //     //
    //   },
    // },
  ];

  const dataSource = [
    {
      key: "1",
      name: "ТД-гарден",
      contact: "+1-123-1234-1212",
      people: "18 624",
      city: "Бостон, Массачусетс, США",
    },
    {
      key: "2",
      name: "Барклайс-центр",
      contact: "+1-123-1234-1212",
      people: "18 000",
      city: "Нью-Йорк (Бруклин), США",
    },
    {
      key: "3",
      name: "Мэдисон-сквер-гарден (IV)",
      contact: "+1-123-1234-1212",
      people: "19 763",
      city: "Нью-Йорк (Манхэттен), США",
    },
    {
      key: "4",
      name: "Веллс-Фарго-центр",
      contact: "+1-123-1234-1212",
      people: "20 444",
      city: "Филадельфия, Пенсильвания, США",
    },
    {
      key: "5",
      name: "Эйр Кэнада-центр",
      contact: "+1-123-1234-1212",
      people: "19 800",
      city: "Торонто, Онтарио, Канада",
    },
    {
      key: "6",
      name: "Стэйт Фарм-арена",
      contact: "+1-123-1234-1212",
      people: "18 750",
      city: "Атланта, Джорджия, США",
    },
  ];

  return (
    <div className="d-stack-column spacing-2">
      {AddRoomDialog(
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
      <div className="d-stack spacing-2">
        <Input placeholder="Название" style={{ width: "250px" }} />
        <Button onClick={() => setIsAddDialogVisible(true)} className="ml-auto">
          Добавить
        </Button>
      </div>
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
