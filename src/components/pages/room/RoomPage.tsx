import React, { useEffect, useState } from "react";
import { Button, Divider, Form, Input, Modal, Table } from "antd";
import { RoomAddDialog } from "../../dialogs/RoomAddDialog";
import { roomTableColumns } from "../../../constants/tableColumns/roomTable";
import { api } from "../../../services";
import { showMessage } from "../../../helpers/notifierHelpers";

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

  const [tableFilters, setTableFilters] = useState({
    roomName: "",
    roomAddress: "",
  });

  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleDataFetch = async () => {
    setIsLoading(true);
    const r = await api.location.getAll();
    setIsLoading(false);
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    setData(
      r.map((item, i) => ({
        key: i,
        name: item.name,
        contact: item.contact,
        people: item.capacity,
        city: item.address,
      }))
    );
  };

  useEffect(() => {
    handleDataFetch();
  }, []);

  return (
    <div className="d-stack-column spacing-2">
      <RoomAddDialog
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
        <Form.Item label="Место проведения">
          <Input
            value={tableFilters.roomName}
            onInput={(event: React.FormEvent<HTMLInputElement>) =>
              setTableFilters({
                ...tableFilters,
                roomName: event.currentTarget.value,
              })
            }
            placeholder="Название места проведения"
            style={{ width: "250px" }}
          />
        </Form.Item>
        <Form.Item label="Адрес">
          <Input
            value={tableFilters.roomAddress}
            onInput={(event: React.FormEvent<HTMLInputElement>) =>
              setTableFilters({
                ...tableFilters,
                roomAddress: event.currentTarget.value,
              })
            }
            placeholder="Адрес места проведения"
            style={{ width: "250px" }}
          />
        </Form.Item>
        <div className="flex-grow-1" />
        <Form.Item label=" ">
          <Button type="primary" onClick={() => setIsAddDialogVisible(true)} className="ml-auto">
            Добавить
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Table
        dataSource={data.filter(
          (item) =>
            item.name.toLowerCase().includes(tableFilters.roomName.toLowerCase()) &&
            item.city.toLowerCase().includes(tableFilters.roomAddress.toLowerCase())
        )}
        loading={isLoading}
        columns={roomTableColumns}
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
