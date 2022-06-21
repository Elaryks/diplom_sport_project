import React, { useEffect, useState } from "react";
import { Button, Divider, Form, Input, Table } from "antd";
import { tournamentTableColumns } from "../../../constants/tableColumns/tournamentTable";
import { api } from "../../../services";
import { showMessage } from "../../../helpers/notifierHelpers";
import { TournamentModel } from "../../../api/models/tournamentModel";
import { TournamentAddDialog } from "../../dialogs/TournamentAddDialog";
import { useRootStore } from "../../../hooks/useRootStore";
import { observer } from "mobx-react-lite";
import { TournamentEditViewDialog } from "../../dialogs/TournamentEditViewDialog";

function Page() {
  const { authStore } = useRootStore();

  const [isAddDialogVisible, setIsAddDialogVisible] = useState<boolean>(false);
  const [isRowDialogVisible, setIsRowDialogVisible] = useState<boolean>(false);
  const [rowDialogItemId, setRowDialogItemId] = useState<number | null>(null);

  const [tableFilters, setTableFilters] = useState({
    tournamentName: "",
    tournamentCreator: "",
  });

  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleDataFetch = async () => {
    setIsLoading(true);
    const r = await api.tournament.getAll();
    setIsLoading(false);
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    const d = r.map((item) => generateTableRow(item));
    const data = await Promise.all(d);
    setData(data);
  };

  const generateTableRow = async (item: TournamentModel) => {
    const gamesLength = await getGamesInTournamentById(item.id as number);
    return {
      id: item.id,
      key: item.id,
      name: item.name,
      manager:
        (item.creator?.lastName ?? "") + " " + (item.creator?.firstName ?? "") + " " + (item.creator?.middleName ?? ""),
      teams: gamesLength ?? 0,
    };
  };

  const getGamesInTournamentById = async (tournamentId: number): Promise<number> => {
    const r = await api.teamInTournament.getAll({ tournamentId });
    // const r = await api.game.getAll({ tournamentId });
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return 0;
    }
    return r.length;
  };

  useEffect(() => {
    handleDataFetch();
  }, []);

  return (
    <div className="d-stack-column spacing-2">
      <TournamentAddDialog
        isOpen={isAddDialogVisible}
        onSuccess={() => handleDataFetch()}
        onClose={() => setIsAddDialogVisible(false)}
      />
      <TournamentEditViewDialog
        isOpen={isRowDialogVisible}
        itemId={rowDialogItemId}
        isEditMode={false}
        onSuccess={() => handleDataFetch()}
        onClose={() => {
          setIsRowDialogVisible(false);
          setRowDialogItemId(null);
        }}
      />
      <Form style={{ width: "100%" }} className="d-stack spacing-2 no-margin-form" layout="vertical">
        <Form.Item label="Соревнование">
          <Input
            value={tableFilters.tournamentName}
            onInput={(event: React.FormEvent<HTMLInputElement>) =>
              setTableFilters({
                ...tableFilters,
                tournamentName: event.currentTarget.value,
              })
            }
            placeholder="Название соревнования"
            style={{ width: "250px" }}
          />
        </Form.Item>
        <Form.Item label="Организатор">
          <Input
            value={tableFilters.tournamentCreator}
            onInput={(event: React.FormEvent<HTMLInputElement>) =>
              setTableFilters({
                ...tableFilters,
                tournamentCreator: event.currentTarget.value,
              })
            }
            placeholder="ФИО организатора"
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
            item.name.toLowerCase().includes(tableFilters.tournamentName.toLowerCase()) &&
            item.manager.toLowerCase().includes(tableFilters.tournamentCreator.toLowerCase())
        )}
        columns={tournamentTableColumns}
        loading={isLoading}
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

export const TournamentPage = observer(Page);
