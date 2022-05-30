import React, { useState } from "react";
import { Button, Form, Input, Modal, Table } from "antd";

const AddTournamentDialog = (open: boolean, handleOk: () => void, handleCancel: () => void) => {
  return (
    <Modal
      centered
      title="Добавить соревнование"
      cancelText="Отмена"
      okText="Добавить"
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
      <Form layout="vertical">
        <Form.Item label="Название">
          <Input placeholder="Название" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const RowDialog = (open: boolean, state: any, handleOk: () => void, handleCancel: () => void) => {
  return (
    <Modal
      centered
      title="Редактировать соревнование"
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
          <Form.Item label="Организатор">
            <Input value={state.manager} placeholder="Организатор" />
          </Form.Item>
          <Form.Item label="Количество команд">
            <Input value={state.teams} placeholder="Количество команд" />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export function TournamentPage() {
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
      title: "Организатор",
      dataIndex: "manager",
      key: "manager",
    },
    {
      title: "Количество команд",
      dataIndex: "teams",
      key: "teams",
    },
  ];

  const dataSource = [
    {
      key: "1",
      name: "Финал - Запад",
      manager: "Селтикс",
      teams: "23",
    },
    {
      key: "2",
      name: "Финал - Восток",
      manager: "Хьюстон Рокетс",
      teams: "12",
    },
    {
      key: "3",
      name: "Финал - Запад",
      manager: "Портленд Трэйл Блэйзерс",
      teams: "10",
    },
    {
      key: "4",
      name: "Финал - Запад",
      manager: "Оклахома-Сити Тандер",
      teams: "31",
    },
    {
      key: "5",
      name: "Финал - Восток",
      manager: "Бруклин Нетс",
      teams: "10",
    },
  ];

  return (
    <div className="d-stack-column spacing-2">
      {AddTournamentDialog(
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
