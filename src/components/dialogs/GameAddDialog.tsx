import React, { useEffect, useState } from "react";
import { DatePicker, Form, Input, Modal, Select, TimePicker } from "antd";
import { api } from "../../services";
import { showMessage } from "../../helpers/notifierHelpers";
import { GameModel } from "../../api/models/gameModel";
import moment from "moment";
import { TeamModel } from "../../api/models/teamModel";
import { LocationModel } from "../../api/models/locationModel";
import { TeamInTournamentModel } from "../../api/models/teamInTournamentModel";

interface IGameAddDialog {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

const initState: GameModel = {
  team1Id: undefined,
  team2Id: undefined,
  countPointsTeam1: 0,
  countPointsTeam2: 0,
  dateEvent: "",
  tournamentId: undefined,
  // locationId: 0,
};

export function GameAddDialog(props: IGameAddDialog) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<GameModel>(initState);

  const [teamArray, setTeamArray] = useState<TeamInTournamentModel[]>([]);
  const [locationArray, setLocationArray] = useState<LocationModel[]>([]);
  const [tournamentArray, setTournamentArray] = useState<TeamModel[]>([]);

  const handleCreate = async () => {
    setIsLoading(true);
    const r = await api.game.create({
      ...formState,
      winningTeamId:
        (formState?.team1Id as number) > (formState?.team2Id as number) ? formState.team1Id : formState.team2Id,
    });
    setIsLoading(false);
    if (r == null) {
      showMessage("Что-то пошло не так", "Убедитесь, что данные заполнены верно", "error");
      return;
    }
    showMessage("Матч успешно добавлен", undefined, "success");
    props.onSuccess();
    handleCancel();
  };

  const handleDataFetch = async () => {
    const r = await api.tournament.getAll();
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    setTournamentArray(r);
    await handleLocationsFetch();
  };

  const handleTeamsFetch = async (tournamentId: number) => {
    setTeamArray([]);
    const r = await api.teamInTournament.getAll({ tournamentId });
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    setTeamArray(r);
  };

  const handleLocationsFetch = async () => {
    setLocationArray([]);
    const r = await api.location.getAll();
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    setLocationArray(r);
  };

  useEffect(() => {
    if (formState.tournamentId == null) return;
    handleTeamsFetch(formState.tournamentId);
  }, [formState.tournamentId]);

  const handleCancel = () => {
    if (isLoading) return;
    props.onClose();
    setTimeout(() => {
      setIsLoading(false);
      setFormState(initState);
      setTeamArray([]);
      setTournamentArray([]);
    }, 350);
  };

  useEffect(() => {
    if (props.isOpen) {
      handleDataFetch();
    }
  }, [props.isOpen]);

  return (
    <Modal
      centered
      title="Добавить матч"
      cancelText="Отмена"
      okText="Добавить"
      destroyOnClose
      confirmLoading={isLoading}
      closable={!isLoading}
      visible={props.isOpen}
      onOk={handleCreate}
      onCancel={handleCancel}
    >
      <Form layout="vertical">
        <div className="d-stack spacing-2">
          <Form.Item style={{ flexBasis: "50%" }} label="Соревнование">
            <Select
              value={formState.tournamentId ? String(formState.tournamentId) : undefined}
              onChange={(value) => setFormState({ ...formState, tournamentId: Number(value) })}
              placeholder="Соревнование"
            >
              {tournamentArray.map((item) => (
                <Select.Option key={item.id}>{item.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <div style={{ flexBasis: "50%" }} className="d-stack spacing-2">
            <Form.Item label="Итоговый счет матча">
              <div className="d-stack spacing-2 align-center">
                <Input
                  value={String(formState.countPointsTeam1 ?? "")}
                  onInput={(event: React.FormEvent<HTMLInputElement>) =>
                    setFormState({
                      ...formState,
                      countPointsTeam1: Number(event.currentTarget.value ?? 0),
                    })
                  }
                  type="number"
                  min="0"
                  placeholder="Команда 1"
                />
                <span> - </span>
                <Input
                  value={String(formState.countPointsTeam2 ?? "")}
                  onInput={(event: React.FormEvent<HTMLInputElement>) =>
                    setFormState({
                      ...formState,
                      countPointsTeam2: Number(event.currentTarget.value ?? 0),
                    })
                  }
                  type="number"
                  min="0"
                  placeholder="Команда 2"
                />
              </div>
            </Form.Item>
          </div>
        </div>
        <Form.Item label="Место проведения">
          <Select
            value={formState.locationId ? String(formState.locationId) : undefined}
            onChange={(value) => setFormState({ ...formState, locationId: Number(value) })}
            placeholder="Место проведения"
          >
            {locationArray.map((item) => (
              <Select.Option key={item.id}>{item.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div className="d-stack spacing-2">
          <Form.Item label="Команда 1" style={{ flexBasis: "50%" }}>
            <Select
              value={formState.team1Id ? String(formState.team1Id) : undefined}
              onChange={(value) => setFormState({ ...formState, team1Id: Number(value) })}
              placeholder="Команда 1"
            >
              {teamArray.map((item) => (
                <Select.Option key={item.teamId}>{item.tournamentTeam?.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Команда 2" style={{ flexBasis: "50%" }}>
            <Select
              value={formState.team2Id ? String(formState.team2Id) : undefined}
              onChange={(value) => setFormState({ ...formState, team2Id: Number(value) })}
              placeholder="Команда 2"
            >
              {teamArray.map((item) => (
                <Select.Option key={item.teamId}>{item.tournamentTeam?.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="d-stack spacing-2">
          <Form.Item label="Дата проведения" style={{ flexBasis: "50%" }}>
            <DatePicker
              value={formState.dateEvent ? moment(formState.dateEvent) : undefined}
              onChange={(value) => setFormState({ ...formState, dateEvent: value?.toDate().toISOString() })}
              allowClear={false}
              style={{ width: "100%" }}
              placeholder="Дата проведения"
            />
          </Form.Item>
          <Form.Item label="Время проведения" style={{ flexBasis: "50%" }}>
            <TimePicker
              value={formState.dateEvent ? moment(formState.dateEvent) : undefined}
              onChange={(value) => setFormState({ ...formState, dateEvent: value?.toDate().toISOString() })}
              allowClear={false}
              format="HH:mm"
              style={{ width: "100%" }}
              placeholder="Время проведения"
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
