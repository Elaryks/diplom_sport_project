import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Modal, Select, Spin, TimePicker } from "antd";
import { api } from "../../services";
import { showMessage } from "../../helpers/notifierHelpers";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../hooks/useRootStore";
import { GameModel } from "../../api/models/gameModel";
import moment from "moment";
import { TeamInTournamentModel } from "../../api/models/teamInTournamentModel";
import { LocationModel } from "../../api/models/locationModel";
import { TournamentModel } from "../../api/models/tournamentModel";

interface IPlayerEditViewDialog {
  itemId?: number | null;
  isOpen: boolean;
  isEditMode?: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

function Dialog(props: IPlayerEditViewDialog) {
  const { authStore } = useRootStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<GameModel | null>(null);

  const [teamArray, setTeamArray] = useState<TeamInTournamentModel[]>([]);
  const [locationArray, setLocationArray] = useState<LocationModel[]>([]);
  const [tournamentArray, setTournamentArray] = useState<TournamentModel[]>([]);

  const handleFetchData = async () => {
    if (props.itemId == null) return;
    setIsLoading(true);
    const r = await api.game.getById(props.itemId);
    setIsLoading(false);
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    setFormState(r);
    const rr = await api.tournament.getAll();
    if (rr == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    setTournamentArray(rr);
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

  useEffect(() => {
    if (formState?.tournamentId == null) return;
    handleTeamsFetch(formState.tournamentId);
  }, [formState?.tournamentId]);

  const handleLocationsFetch = async () => {
    setLocationArray([]);
    const r = await api.location.getAll();
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    setLocationArray(r);
  };

  const handleSave = async () => {
    if (formState == null) return;
    setIsLoading(true);
    const r = await api.game.edit(formState?.id as number, {
      ...formState,
      winningTeamId:
        (formState?.countPointsTeam1 as number) > (formState?.countPointsTeam2 as number)
          ? formState.team1Id
          : formState.team2Id,
    });
    setIsLoading(false);
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    showMessage("Матч успешно изменен");
    props.onSuccess();
    handleCancel();
  };

  const handleDelete = async () => {
    const r = await api.game.del(formState as GameModel);
    if (r == null || r == false) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    showMessage("Матч успешно удален");
    props.onSuccess();
    handleCancel();
  };

  const handleOk = async () => {
    await handleSave();
  };

  const handleCancel = () => {
    if (isLoading) return;
    props.onClose();
    setTimeout(() => {
      setFormState(null);
      setTeamArray([]);
      setTournamentArray([]);
    }, 350);
  };

  useEffect(() => {
    if (props.isOpen) {
      handleFetchData();
    }
  }, [props.isOpen]);

  return (
    <Modal
      centered
      title="Матч"
      cancelText="Отмена"
      okText="Сохранить"
      visible={props.isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <>
          {props.isEditMode && (
            <Button onClick={() => handleDelete()} danger style={{ float: "left" }}>
              Удалить
            </Button>
          )}
          <Button onClick={() => handleCancel()}>Отмена</Button>
          {props.isEditMode && (
            <Button onClick={() => handleOk()} type="primary">
              Сохранить
            </Button>
          )}
        </>
      }
    >
      <Spin spinning={isLoading}>
        <Form style={{ pointerEvents: props.isEditMode ? "auto" : "none" }} layout="vertical">
          <div className="d-stack spacing-2">
            <Form.Item style={{ flexBasis: "50%" }} label="Соревнование">
              <Select
                value={formState?.tournamentId != null ? String(formState.tournamentId) : undefined}
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
                    value={String(formState?.countPointsTeam1 ?? "")}
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
                    value={String(formState?.countPointsTeam2 ?? "")}
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
              value={formState?.locationId != null ? String(formState.locationId) : undefined}
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
                value={formState?.team1Id != null ? String(formState.team1Id) : undefined}
                onChange={(value) => setFormState({ ...formState, team1Id: Number(value) })}
                placeholder="Команда 1"
              >
                {teamArray.map((item) => (
                  <Select.Option key={item.id}>{item.tournamentTeam?.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Команда 2" style={{ flexBasis: "50%" }}>
              <Select
                value={formState?.team2Id != null ? String(formState.team2Id) : undefined}
                onChange={(value) => setFormState({ ...formState, team2Id: Number(value) })}
                placeholder="Команда 2"
              >
                {teamArray.map((item) => (
                  <Select.Option key={item.id}>{item.tournamentTeam?.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="d-stack spacing-2">
            <Form.Item label="Дата проведения" style={{ flexBasis: "50%" }}>
              <DatePicker
                value={formState?.dateEvent != null ? moment(formState.dateEvent) : undefined}
                onChange={(value) => setFormState({ ...formState, dateEvent: value?.toDate().toISOString() })}
                allowClear={false}
                style={{ width: "100%" }}
                placeholder="Дата проведения"
              />
            </Form.Item>
            <Form.Item label="Время проведения" style={{ flexBasis: "50%" }}>
              <TimePicker
                value={formState?.dateEvent != null ? moment(formState.dateEvent) : undefined}
                onChange={(value) => setFormState({ ...formState, dateEvent: value?.toDate().toISOString() })}
                allowClear={false}
                format="HH:mm"
                style={{ width: "100%" }}
                placeholder="Время проведения"
              />
            </Form.Item>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
}

export const GameEditViewDialog = observer(Dialog);
