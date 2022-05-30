import React, { useState } from "react";
import { Button, Form, Input, Modal, Table } from "antd";

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
  ];

  const dataSource = [
    {
      key: "1",
      name: "Атланта Хоукс",
      city: "Атланта",
    },
    {
      key: "2",
      name: "Бостон Селтикс",
      city: "Бостон",
    },
    {
      key: "3",
      name: "Бруклин Нетс",
      city: "Нью-Йорк",
    },
    {
      key: "4",
      name: "Вашингтон Уизардс",
      city: "Вашингтон",
    },
    {
      key: "5",
      name: "Денвер Наггетс",
      city: "Денвер",
    },
    {
      key: "6",
      name: "Милуоки Бакс",
      city: "Милуоки",
    },
    {
      key: "7",
      name: "Нью-Йорк Никс",
      city: "Нью-Йорк",
    },
    {
      key: "8",
      name: "Орландо Мэджик",
      city: "Орландо",
    },
    {
      key: "9",
      name: "Торонто Рэпторс",
      city: "Торонто",
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
      <div className="d-stack spacing-2">
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
