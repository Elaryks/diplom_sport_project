import React, { useState } from "react";
import { Button, Divider, Form, Input, Modal, Select, Table } from "antd";

const AddTournamentDialog = (open: boolean, handleOk: () => void, handleCancel: () => void) => {
  return (
    <Modal
      centered
      title="Добавить турнир"
      cancelText="Отмена"
      okText="Добавить"
      visible={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout="vertical">
        <Form.Item label="Команда">
          <Input placeholder="Команда" />
        </Form.Item>
        <div className="d-stack spacing-2">
          <Form.Item label="Матчи">
            <Input placeholder="Матчи" />
          </Form.Item>
          <Form.Item label="Выиграно">
            <Input placeholder="Выиграно" />
          </Form.Item>
          <Form.Item label="Проиграно">
            <Input placeholder="Проиграно" />
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
      title="Просмотр турнира"
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
          <Button onClick={() => handleCancel()}>Закрыть</Button>
          {/*<Button onClick={() => handleOk()} type="primary">*/}
          {/*  Сохранить*/}
          {/*</Button>*/}
        </>
      }
    >
      {state != null && (
        <Form layout="vertical">
          <Form.Item label="Команда">
            <Input value={state.team} placeholder="Команда" />
          </Form.Item>
          <div className="d-stack spacing-2">
            <Form.Item label="Матчи">
              <Input value={state.ga} placeholder="Матчи" />
            </Form.Item>
            <Form.Item label="Выиграно">
              <Input value={state.gw} placeholder="Выиграно" />
            </Form.Item>
            <Form.Item label="Проиграно">
              <Input value={state.gl} placeholder="Проиграно" />
            </Form.Item>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export function TablePage() {
  const [isAddDialogVisible, setIsAddDialogVisible] = useState<boolean>(false);
  const [isRowDialogVisible, setIsRowDialogVisible] = useState<boolean>(false);
  const [rowDialogState, setRowDialogState] = useState<any>(null);

  const columns = [
    {
      title: "Номер",
      dataIndex: "index",
      key: "index",
      width: "1%",
    },
    {
      title: "Команда",
      dataIndex: "team",
      key: "team",
    },
    {
      title: "И",
      dataIndex: "ga",
      key: "ga",
      // width: "1%",
    },
    {
      title: "В",
      dataIndex: "gw",
      key: "gw",
      // width: "1%",
    },
    {
      title: "П",
      dataIndex: "gl",
      key: "gl",
      // width: "1%",
    },
    // {
    //   title: "%",
    //   dataIndex: "p",
    //   key: "p",
    //   // width: "1%",
    // },
  ];

  const dataSource = [
    {
      key: "1",
      index: "1",
      team: "Хит",
      ga: "82",
      gw: "53",
      gl: "29",
    },
    {
      key: "2",
      index: "2",
      team: "Септикс",
      ga: "82",
      gw: "51",
      gl: "31",
    },
    {
      key: "3",
      index: "3",
      team: "Бакс",
      ga: "82",
      gw: "51",
      gl: "31",
    },
    {
      key: "4",
      index: "4",
      team: "Рэпторз",
      ga: "82",
      gw: "48",
      gl: "34",
    },
    {
      key: "5",
      index: "5",
      team: "Буллс",
      ga: "82",
      gw: "46",
      gl: "36",
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
        <Select value="1" placeholder="" style={{ width: "150px" }}>
          <Select.Option key="1">Все</Select.Option>
          <Select.Option key="2">В гостях</Select.Option>
          <Select.Option key="3">Дома</Select.Option>
        </Select>
        <Input placeholder="Команда" style={{ width: "250px" }} />
        {/*<Button onClick={() => setIsAddDialogVisible(true)} className="ml-auto">*/}
        {/*  Добавить*/}
        {/*</Button>*/}
      </div>
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
