import React, { useState } from "react";
import { Button, DatePicker, Divider, Form, Input, Modal, Select, Table } from "antd";

const AddGameDialog = (open: boolean, handleOk: () => void, handleCancel: () => void) => {
  return (
    <Modal
      centered
      title="Добавить матч"
      cancelText="Отмена"
      okText="Добавить"
      visible={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout="vertical">
        <div className="d-stack spacing-2">
          <Form.Item style={{ flex: 1 }} label="Соревнование">
            <Select placeholder="Соревнование">
              <Select.Option>Финал - Запад</Select.Option>
            </Select>
          </Form.Item>
          <div style={{ flexBasis: "50%" }} className="d-stack spacing-2">
            <Form.Item label="Итоговый счёт матча">
              <div className="d-stack spacing-2 align-center">
                <Input placeholder="Команда 1" />
                <span> - </span>
                <Input placeholder="Команда 2" />
              </div>
            </Form.Item>
          </div>
        </div>
        <div className="d-stack spacing-2">
          <Form.Item label="Команда 1" className="flex-grow-1">
            <Input placeholder="Команда 1" />
          </Form.Item>
          <Form.Item label="Команда 2" className="flex-grow-1">
            <Input placeholder="Команда 2" />
          </Form.Item>
        </div>
        <div className="d-stack spacing-2">
          <Form.Item label="Дата проведения" className="flex-grow-1">
            <Input placeholder="Дата проведения" />
          </Form.Item>
          <Form.Item label="Время проведения" className="flex-grow-1">
            <Input placeholder="Время проведения" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

const RowDialog = (open: boolean, state: any, handleOk: () => void, handleCancel: () => void) => {
  return (
    <Modal
      centered
      title="Редактировать матч"
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
          <div className="d-stack spacing-2">
            <Form.Item style={{ flex: 1 }} label="Соревнование">
              <Select placeholder="Соревнование">
                <Select.Option>Финал - Запад</Select.Option>
              </Select>
            </Form.Item>
            <div style={{ flexBasis: "50%" }} className="d-stack spacing-2">
              <Form.Item label="Итоговый счёт матча">
                <div className="d-stack spacing-2 align-center">
                  <Input placeholder="Команда 1" />
                  <span> - </span>
                  <Input placeholder="Команда 2" />
                </div>
              </Form.Item>
            </div>
          </div>
          <div className="d-stack spacing-2">
            <Form.Item label="Команда 1" className="flex-grow-1">
              <Input value={state.team1} placeholder="Команда 1" />
            </Form.Item>
            <Form.Item label="Команда 2" className="flex-grow-1">
              <Input value={state.team2} placeholder="Команда 2" />
            </Form.Item>
          </div>
          <div className="d-stack spacing-2">
            <Form.Item label="Дата проведения" className="flex-grow-1">
              <Input value={state.date.split(" в ")[0]} placeholder="Дата проведения" />
            </Form.Item>
            <Form.Item label="Время проведения" className="flex-grow-1">
              <Input value={state.date.split(" в ")[1]} placeholder="Время проведения" />
            </Form.Item>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export function GamePage() {
  const [isAddDialogVisible, setIsAddDialogVisible] = useState<boolean>(false);
  const [isRowDialogVisible, setIsRowDialogVisible] = useState<boolean>(false);
  const [rowDialogState, setRowDialogState] = useState<any>(null);

  const columns = [
    {
      title: "Соревнование",
      dataIndex: "competition",
      key: "competition",
    },
    {
      title: "Команда 1",
      dataIndex: "team1",
      key: "team1",
    },
    {
      title: "Команда 2",
      dataIndex: "team2",
      key: "team2",
    },
    {
      title: "Очки",
      dataIndex: "result",
      key: "result",
      // width: "1%",
    },
    {
      title: "Дата и время проведения",
      dataIndex: "date",
      key: "date",
      width: "15%",
    },
  ];

  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      competition: "Финал - Запад",
      name: "",
      team1: "Хит",
      team2: "Септикс",
      result: "96 - 100",
      date: "27.05 в 19:35",
    },
    {
      key: "2",
      competition: "Финал - Запад",
      name: "",
      team1: "Септикс",
      team2: "Хит",
      result: "103 - 111",
      date: "27.05 в 17:25",
    },
    {
      key: "3",
      competition: "Финал - Запад",
      name: "",
      team1: "Уорриорз",
      team2: "Маверикс",
      result: "120 - 110",
      date: "27.05 в 11:00",
    },
    {
      key: "4",
      competition: "Финал - Запад",
      name: "",
      team1: "Хит",
      team2: "Септикс",
      result: "80 - 93",
      date: "27.05 в 09:30",
    },
    {
      key: "5",
      competition: "Финал - Запад",
      name: "",
      team1: "Маверикс",
      team2: "Уорриорз",
      result: "119 - 109",
      date: "27.05 в 07:35",
    },
    {
      key: "6",
      competition: "Финал - Запад",
      name: "",
      team1: "Септикс",
      team2: "Хит",
      result: "102 - 82",
      date: "27.05 в 06:05",
    },
    {
      key: "7",
      competition: "Финал - Запад",
      name: "",
      team1: "Маверикс",
      team2: "Уорриорз",
      result: "100 - 109",
      date: "26.05 в 13:05",
    },
    {
      key: "8",
      competition: "Финал - Запад",
      name: "",
      team1: "Септикс",
      team2: "Хит",
      result: "103 - 109",
      date: "27.05 в 13:05",
    },
    {
      key: "9",
      competition: "Финал - Запад",
      name: "",
      team1: "Уорриорз",
      team2: "Маверикс",
      result: "126 - 117",
      date: "26.05 в 13:05",
    },
    {
      key: "10",
      competition: "Финал - Запад",
      name: "",
      team1: "Септикс",
      team2: "Хит",
      result: "102 - 127",
      date: "26.05 в 13:05",
    },
    {
      key: "11",
      competition: "Финал - Запад",
      name: "",
      team1: "Уорриорз",
      team2: "Маверикс",
      result: "112 - 87",
      date: "25.05 в 13:05",
    },
  ]);

  return (
    <div className="d-stack-column spacing-2">
      {AddGameDialog(
        isAddDialogVisible,
        () => {
          // setDataSource(...data, ...dataSource)
        },
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
        <Form.Item label="Соревнования">
          <Select value="1" placeholder="" style={{ width: "150px" }}>
            <Select.Option key="1">Все</Select.Option>
            <Select.Option key="2">В гостях</Select.Option>
            <Select.Option key="3">Дома</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Дата проведения">
          <DatePicker placeholder="Дата проведения" />
        </Form.Item>
        <Form.Item label="Команда">
          <Input placeholder="Название команды" style={{ width: "250px" }} />
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
