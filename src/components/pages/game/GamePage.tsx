import React, { useEffect, useState } from "react";
import { Button, DatePicker, Divider, Form, Input, Modal, Select, Table, TimePicker } from "antd";
import { gameTableColumns } from "../../../constants/tableColumns/gameTable";
import { GameAddDialog } from "../../dialogs/GameAddDialog";
import { api } from "../../../services";
import { showMessage } from "../../../helpers/notifierHelpers";
import moment from "moment";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../hooks/useRootStore";

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
            <Form.Item style={{ flexBasis: "50%" }} label="Соревнование">
              <Select placeholder="Соревнование">
                <Select.Option>Финал - Запад</Select.Option>
              </Select>
            </Form.Item>
            <div style={{ flexBasis: "50%" }} className="d-stack spacing-2">
              <Form.Item label="Итоговый счет матча">
                <div className="d-stack spacing-2 align-center">
                  <Input placeholder="Команда 1" />
                  <span> - </span>
                  <Input placeholder="Команда 2" />
                </div>
              </Form.Item>
            </div>
          </div>
          <div className="d-stack spacing-2">
            <Form.Item label="Команда 1" style={{ flexBasis: "50%" }}>
              {/*<Input value={state.team1} placeholder="Команда 1" />*/}
              <Select placeholder="Команда 1">
                <Select.Option>Уорриорз</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Команда 2" style={{ flexBasis: "50%" }}>
              {/*<Input value={state.team2} placeholder="Команда 2" />*/}
              <Select placeholder="Команда 2">
                <Select.Option>Маверикс</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="d-stack spacing-2">
            <Form.Item label="Дата проведения" style={{ flexBasis: "50%" }}>
              <DatePicker style={{ width: "100%" }} placeholder="Дата проведения" />
            </Form.Item>
            <Form.Item label="Время проведения" style={{ flexBasis: "50%" }}>
              <TimePicker format="HH:mm" style={{ width: "100%" }} placeholder="Время проведения" />
            </Form.Item>
          </div>
        </Form>
      )}
    </Modal>
  );
};

function Page() {
  const { authStore } = useRootStore();

  const [isAddDialogVisible, setIsAddDialogVisible] = useState<boolean>(false);
  const [isRowDialogVisible, setIsRowDialogVisible] = useState<boolean>(false);
  const [rowDialogState, setRowDialogState] = useState<any>(null);

  const [tableFilters, setTableFilters] = useState({
    gameTeamName: "",
    gameDate: null,
  });

  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleDataFetch = async () => {
    let allCompetitions = [];
    setIsLoading(true);
    const r = await api.game.getAll();
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
    allCompetitions = rr;
    setData(
      r.map((item, i) => ({
        key: i,
        competition: rr.find((c) => c.id == item.tournamentId)?.name ?? "",
        name: "",
        team1: item.team1?.team?.name,
        team2: item.team2?.team?.name,
        result: item.countPointsTeam1 ?? 0 + " - " + item.countPointsTeam2 ?? 0,
        date: moment(item.dateEvent)?.toDate().toLocaleDateString(),
      }))
    );
  };

  useEffect(() => {
    handleDataFetch();
  }, []);

  return (
    <div className="d-stack-column spacing-2">
      <GameAddDialog
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
        <Form.Item label="Соревнования">
          <Select value="0" placeholder="" style={{ width: "150px" }}>
            <Select.Option key="0">Все</Select.Option>
            <Select.Option key="1">В гостях</Select.Option>
            <Select.Option key="2">Дома</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Дата проведения">
          <DatePicker
            allowClear
            value={tableFilters.gameDate}
            onChange={(value) =>
              setTableFilters({
                ...tableFilters,
                gameDate: value as any,
              })
            }
            style={{ width: "100%" }}
            placeholder="Дата проведения"
          />
        </Form.Item>
        <Form.Item label="Команда">
          <Input
            value={tableFilters.gameTeamName}
            onInput={(event: React.FormEvent<HTMLInputElement>) =>
              setTableFilters({
                ...tableFilters,
                gameTeamName: event.currentTarget.value,
              })
            }
            placeholder="Название команды"
            style={{ width: "250px" }}
          />
        </Form.Item>
        <div className="flex-grow-1" />
        {(authStore.getCurrentUserRole == 2 || authStore.getCurrentUserRole == 3) && (
          <Form.Item label=" ">
            <Button type="primary" onClick={() => setIsAddDialogVisible(true)}>
              Добавить
            </Button>
          </Form.Item>
        )}
      </Form>
      <Divider />
      <Table
        dataSource={data.filter(
          (item) =>
            ((item.team1 ?? "")?.toLowerCase().includes((tableFilters.gameTeamName ?? "")?.toLowerCase()) ||
              (item.team2 ?? "")?.toLowerCase().includes((tableFilters.gameTeamName ?? "")?.toLowerCase())) &&
            (tableFilters.gameDate != null && item.date != null
              ? moment(item.date).isSame(tableFilters.gameDate)
              : true)
        )}
        loading={isLoading}
        columns={gameTableColumns}
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

export const GamePage = observer(Page);
