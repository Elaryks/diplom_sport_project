import React, { useEffect, useState } from "react";
import { Button, Divider, Form, Input, Table } from "antd";
import { RoomAddDialog } from "../../dialogs/RoomAddDialog";
import { roomTableColumns } from "../../../constants/tableColumns/roomTable";
import { api } from "../../../services";
import { showMessage } from "../../../helpers/notifierHelpers";
import { RoomEditViewDialog } from "../../dialogs/RoomEditViewDialog";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../hooks/useRootStore";

function Page() {
  const { authStore } = useRootStore();

  const [isAddDialogVisible, setIsAddDialogVisible] = useState<boolean>(false);
  const [isRowDialogVisible, setIsRowDialogVisible] = useState<boolean>(false);
  const [rowDialogItemId, setRowDialogItemId] = useState<number | null>(null);

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
        id: item.id,
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
      <RoomEditViewDialog
        isOpen={isRowDialogVisible}
        itemId={rowDialogItemId}
        isEditMode={authStore.getCurrentUserRole == 3}
        onSuccess={() => handleDataFetch()}
        onClose={() => {
          setIsRowDialogVisible(false);
          setRowDialogItemId(null);
        }}
      />
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
        {authStore.getCurrentUserRole == 3 && (
          <Form.Item label=" ">
            <Button type="primary" onClick={() => setIsAddDialogVisible(true)} className="ml-auto">
              Добавить
            </Button>
          </Form.Item>
        )}
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
              setRowDialogItemId(record.id);
              setIsRowDialogVisible(true);
            },
          };
        }}
      />
    </div>
  );
}

export const RoomPage = observer(Page);
