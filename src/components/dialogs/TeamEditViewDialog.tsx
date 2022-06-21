import React, { useEffect, useState } from "react";
import { TeamModel } from "../../api/models/teamModel";
import { Button, Form, Input, List, Modal, Spin } from "antd";
import { api } from "../../services";
import { showMessage } from "../../helpers/notifierHelpers";
import { getUserAmpluaById, getUserGenderById } from "../../helpers/userHelpers";
import { UserModel } from "../../api/models/userModel";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../hooks/useRootStore";

interface ITeamEditViewDialog {
  itemId?: number | null;
  isOpen: boolean;
  isEditMode?: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

function Dialog(props: ITeamEditViewDialog) {
  const { authStore } = useRootStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<TeamModel | null>(null);

  const [teamPlayers, setTeamPlayers] = useState<UserModel[]>([]);

  const handleFetchData = async () => {
    if (props.itemId == null) return;
    setIsLoading(true);
    const r = await api.team.getById(props.itemId);
    setIsLoading(false);
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    setFormState(r);
    setIsLoading(true);
    const rr = await api.user.getAll();
    setIsLoading(false);
    if (rr == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    setTeamPlayers(rr.filter((p) => p.teamId == props.itemId));
  };

  const handleJoinOrLeaveTeam = async (join: boolean) => {
    const r = await api.user.edit(authStore.getCurrentUserId as number, {
      ...authStore.getUserData,
      // @ts-ignore
      teamId: join ? (props.itemId as number) : null,
    });
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    const rr = await api.user.getById(authStore.getCurrentUserId as number);
    if (rr == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    authStore.setUserData(rr);
    showMessage(join ? "Вы успешно вступили в команду" : "Вы успешно покинули команду");
    await handleFetchData();
    props.onSuccess();
  };

  const handleSave = async () => {
    if (formState == null) return;
    setIsLoading(true);
    const r = await api.team.edit(formState?.id as number, formState);
    setIsLoading(false);
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    showMessage("Команда успешно изменена");
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
      setTeamPlayers([]);
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
      title={props.isEditMode ? "Редактировать команду" : "Просмотреть команду"}
      cancelText="Отмена"
      okText="Сохранить"
      visible={props.isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <>
          {(authStore.getUserData?.teamId == props.itemId || authStore.getUserData?.teamId == null) &&
            authStore.getCurrentUserRole == 1 && (
              <Button
                style={{
                  float: "left",
                  background: authStore.getUserData?.teamId == props.itemId ? "red" : "green",
                  borderColor: authStore.getUserData?.teamId == props.itemId ? "red" : "green",
                }}
                onClick={() => handleJoinOrLeaveTeam(authStore.getUserData?.teamId != props.itemId)}
                type="primary"
              >
                {authStore.getUserData?.teamId == props.itemId ? "Покинуть" : "Вступить"}
              </Button>
            )}
          {/*<Button danger style={{ float: "left" }}>*/}
          {/*  Удалить*/}
          {/*</Button>*/}
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
          <Form.Item label="Название">
            <Input
              value={formState?.name}
              onInput={(event: React.FormEvent<HTMLInputElement>) =>
                setFormState({
                  ...formState,
                  name: event.currentTarget.value,
                })
              }
              placeholder="Название"
            />
          </Form.Item>
          <Form.Item label="Адрес">
            <Input
              value={formState?.address}
              onInput={(event: React.FormEvent<HTMLInputElement>) =>
                setFormState({
                  ...formState,
                  address: event.currentTarget.value,
                })
              }
              placeholder="Адрес"
            />
          </Form.Item>
        </Form>
        <List
          itemLayout="horizontal"
          dataSource={teamPlayers}
          header={<span>Участники</span>}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <a href="">{(item.lastName ?? "") + " " + (item.firstName ?? "") + " " + (item.middleName ?? "")}</a>
                }
                description={
                  <div className="d-stack-column">
                    <span children={item.amplua != null ? getUserAmpluaById(item.amplua) : ""} />
                    <span children={"Пол: " + (item.gender != null ? getUserGenderById(item.gender) : "не указан")} />
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Spin>
    </Modal>
  );
}

export const TeamEditViewDialog = observer(Dialog);
