import React, { useState } from "react";
import { Button, DatePicker, Divider, Form, Input, Modal, Select, Table } from "antd";

const AddPlayerDialog = (open: boolean, handleOk: () => void, handleCancel: () => void) => {
  return (
    <Modal
      centered
      title="Добавить участника"
      cancelText="Отмена"
      okText="Добавить"
      visible={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout="vertical">
        <Form.Item label="Участник">
          <Input placeholder="Участник" />
        </Form.Item>
        <Form.Item label="Команда">
          <Input placeholder="Команда" />
        </Form.Item>
        <Form.Item label="Амплуа">
          <Select placeholder="Амплуа">
            <Select.Option key="1" children="Нападающий" />
            <Select.Option key="2" children="Защитник" />
            <Select.Option key="3" children="Центровой" />
          </Select>
        </Form.Item>
        <Form.Item label="Рост (см)">
          <Input placeholder="Рост (см)" />
        </Form.Item>
        <Form.Item label="Вес (кг)">
          <Input placeholder="Вес (кг)" />
        </Form.Item>
        <Form.Item label="Дата рождения">
          <DatePicker placeholder="Дата рождения" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const RowDialog = (open: boolean, state: any, handleOk: () => void, handleCancel: () => void) => {
  return (
    <Modal
      centered
      title="Просмотр участника"
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
          <Form.Item label="Участник">
            <Input value={state.name} placeholder="Участник" />
          </Form.Item>
          <Form.Item label="Команда">
            <Input value={state.team} placeholder="Команда" />
          </Form.Item>
          <Form.Item label="Амплуа">
            <Input value={state.role} placeholder="Амплуа" />
            {/*<Select placeholder="Амплуа">*/}
            {/*  <Select.Option key="1" children="Нападающий" />*/}
            {/*  <Select.Option key="2" children="Защитник" />*/}
            {/*  <Select.Option key="3" children="Центровой" />*/}
            {/*</Select>*/}
          </Form.Item>
          <Form.Item label="Рост (см)">
            <Input value={state.height} placeholder="Рост (см)" />
          </Form.Item>
          <Form.Item label="Вес (кг)">
            <Input value={state.weight} placeholder="Вес (кг)" />
          </Form.Item>
          <Form.Item label="Дата рождения">
            <Input value={state.birthday} placeholder="Дата рождения" />
            {/*<DatePicker style={{ width: "100%" }} placeholder="Дата рождения" />*/}
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export function PlayerPage() {
  const [isAddDialogVisible, setIsAddDialogVisible] = useState<boolean>(false);
  const [isRowDialogVisible, setIsRowDialogVisible] = useState<boolean>(false);
  const [rowDialogState, setRowDialogState] = useState<any>(null);

  const columns = [
    {
      title: "Участник",
      dataIndex: "name",
      key: "name",
      width: "40%",
    },
    // {
    //   title: "Команда",
    //   dataIndex: "team",
    //   key: "team",
    // },
    {
      title: "Амплуа",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Рост (см)",
      dataIndex: "height",
      key: "height",
    },
    {
      title: "Вес (кг)",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Дата рождения",
      dataIndex: "birthday",
      key: "birthday",
    },
  ];

  const dataSource = [
    {
      key: "1",
      name: "Джеймс Харден",
      team: "Хьюстон Рокетс",
      role: "защитник",
      height: "157",
      weight: "75",
      birthday: "12.12.1984",
    },
    {
      key: "2",
      name: "Пол Джордж",
      team: "Оклахома-Сити Тандер",
      role: "форвард",
      height: "157",
      weight: "75",
      birthday: "12.12.1984",
    },
    {
      key: "3",
      name: "Яннис Адетокунбо",
      team: "Милуоки Бакс",
      role: "форвард",
      height: "157",
      weight: "75",
      birthday: "12.12.1984",
    },
    {
      key: "4",
      name: "Джоэл Эмбиид",
      team: "Филадельфия Сиксерс",
      role: "центровой",
      height: "157",
      weight: "75",
      birthday: "12.12.1984",
    },
    {
      key: "5",
      name: "Леброн Джеймс",
      team: "Лос-Анджелес Лейкерс",
      role: "форвард",
      height: "157",
      weight: "75",
      birthday: "12.12.1984",
    },
    {
      key: "6",
      name: "Стефен Карри",
      team: "Голден Стэйт Уорриорз",
      role: "защитник",
      height: "157",
      weight: "75",
      birthday: "12.12.1984",
    },
    {
      key: "7",
      name: "Кавай Леонард",
      team: "Торонто Рэпторс",
      role: "форвард",
      height: "157",
      weight: "75",
      birthday: "12.12.1984",
    },
    {
      key: "8",
      name: "Девин Букер",
      team: "Финикс Санз",
      role: "защитник",
      height: "157",
      weight: "75",
      birthday: "12.12.1984",
    },
    {
      key: "9",
      name: "Кевин Дюрант",
      team: "Голден Стэйт Уорриорз",
      role: "форвард",
      height: "157",
      weight: "75",
      birthday: "12.12.1984",
    },
    {
      key: "10",
      name: "Энтони Дэвис",
      team: "Нью-Орлеан Пеликанс",
      role: "форвард",
      height: "157",
      weight: "75",
      birthday: "12.12.1984",
    },
    {
      key: "11",
      name: "Дэмьен Лиллард",
      team: "Портленд Трэйл Блэйзерс",
      role: "защитник",
      height: "157",
      weight: "75",
      birthday: "12.12.1984",
    },
  ];

  return (
    <div className="d-stack-column spacing-2">
      {AddPlayerDialog(
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
        <Form.Item label="Участник">
          <Input placeholder="Участник" style={{ width: "250px" }} />
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
