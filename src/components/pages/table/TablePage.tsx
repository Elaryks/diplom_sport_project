import React, { useEffect, useState } from "react";
import { Button, Divider, Form, Input, Modal, Select, Table } from "antd";
import { tableTableColumns } from "../../../constants/tableColumns/tableTable";
import { api } from "../../../services";
import { showMessage } from "../../../helpers/notifierHelpers";
import { TournamentModel } from "../../../api/models/tournamentModel";

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

  const [tournamentArray, setTournamentArray] = useState<TournamentModel[]>([]);

  const [tableFilters, setTableFilters] = useState({
    tournamentId: undefined,
    tournamentTeamName: "",
  });

  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleDataFetch = async () => {
    setIsLoading(true);
    const r = await api.teamInTournament.getAll();
    setIsLoading(false);
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    const rr = await api.tournament.getAll();
    if (rr == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    setTournamentArray(rr);
    setData(
      r.map((item, i) => ({
        key: i,
        tournamentId: item.tournamentId,
        index: i + 1,
        team: item.tournamentTeam?.name,
        ga: item.countGames,
        gw: item.countWins,
        gl: item.countDefeats,
      }))
    );
  };

  useEffect(() => {
    handleDataFetch();
  }, []);

  return (
    <div className="d-stack-column spacing-2">
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
        <Form.Item label="Соревнование">
          <Select
            allowClear
            value={tableFilters.tournamentId}
            onChange={(value) => setTableFilters({ ...tableFilters, tournamentId: value })}
            placeholder="Соревнование"
            style={{ width: "150px" }}
          >
            {tournamentArray.map((t) => (
              <Select.Option key={t.id}>{t.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Команда">
          <Input
            value={tableFilters.tournamentTeamName}
            onInput={(event: React.FormEvent<HTMLInputElement>) =>
              setTableFilters({
                ...tableFilters,
                tournamentTeamName: event.currentTarget.value,
              })
            }
            placeholder="Название команды"
            style={{ width: "250px" }}
          />
        </Form.Item>
      </Form>
      <Divider />
      <Table
        dataSource={
          tableFilters.tournamentId != null
            ? data.filter(
                (item) =>
                  item.team.toLowerCase().includes(tableFilters.tournamentTeamName.toLowerCase()) &&
                  (tableFilters.tournamentId != null ? item.tournamentId == tableFilters.tournamentId : true)
              )
            : []
        }
        columns={tableTableColumns}
        loading={isLoading}
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
