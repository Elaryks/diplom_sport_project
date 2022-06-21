import React, { useEffect, useState } from "react";
import { Button, Divider, Form, Input, Table } from "antd";
import { TeamAddDialog } from "../../dialogs/TeamAddDialog";
import { teamTableColumns } from "../../../constants/tableColumns/teamTable";
import { api } from "../../../services";
import { showMessage } from "../../../helpers/notifierHelpers";
import { TeamEditViewDialog } from "../../dialogs/TeamEditViewDialog";
import { useRootStore } from "../../../hooks/useRootStore";
import { observer } from "mobx-react-lite";

function Page() {
  const { authStore } = useRootStore();

  const [isAddDialogVisible, setIsAddDialogVisible] = useState<boolean>(false);
  const [isRowDialogVisible, setIsRowDialogVisible] = useState<boolean>(false);
  const [rowDialogItemId, setRowDialogItemId] = useState<number | null>(null);

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
        id: item.id,
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
      <TeamEditViewDialog
        isOpen={isRowDialogVisible}
        itemId={rowDialogItemId}
        isEditMode={authStore.getCurrentUserId == rowDialogItemId}
        onSuccess={() => handleDataFetch()}
        onClose={() => {
          setIsRowDialogVisible(false);
          setRowDialogItemId(null);
        }}
      />
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
              setRowDialogItemId(record.id);
              setIsRowDialogVisible(true);
            },
          };
        }}
      />
    </div>
  );
}

export const TeamPage = observer(Page);
