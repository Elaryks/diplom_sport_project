import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Spin } from "antd";
import { api } from "../../services";
import { showMessage } from "../../helpers/notifierHelpers";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../hooks/useRootStore";
import { LocationModel } from "../../api/models/locationModel";
import { TournamentModel } from "../../api/models/tournamentModel";
import { TeamModel } from "../../api/models/teamModel";

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
  const [formState, setFormState] = useState<TournamentModel | null>(null);

  const handleFetchData = async () => {
    if (props.itemId == null) return;
    setIsLoading(true);
    const r = await api.tournament.getById(props.itemId);
    setIsLoading(false);
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    setFormState(r);
  };

  const handleSave = async () => {
    if (formState == null) return;
    setIsLoading(true);
    const r = await api.tournament.edit(formState?.id as number, formState);
    setIsLoading(false);
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    showMessage("Соревнование успешно изменено");
    props.onSuccess();
    handleCancel();
  };

  const handleDelete = async () => {
    const r = await api.tournament.del(formState as LocationModel);
    if (r == null || r == false) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    showMessage("Соревнование успешно удалено");
    props.onSuccess();
    handleCancel();
  };

  const handleTakeTournament = async () => {
    const r = await api.team.add2tournament({
      ...formState,
      // @ts-ignore
      teamId: formState.id,
      tournamentId: props.itemId,
    } as TeamModel);
    if (r == null || r == false) {
      showMessage("Что-то пошло не так", "Возможно, Вы уже участвуете в турнире", "error");
      return;
    }
    showMessage("Вы успешно приняли участие");
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
      title="Соревнование"
      cancelText="Отмена"
      okText="Сохранить"
      visible={props.isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <>
          {formState?.userId == authStore.getCurrentUserId && (
            <Button onClick={() => handleDelete()} danger style={{ float: "left" }}>
              Удалить
            </Button>
          )}
          {authStore.getUserData?.teamId != null && (
            <Button
              style={{
                float: "left",
                background: "green",
                borderColor: "green",
              }}
              onClick={() => handleTakeTournament()}
              type="primary"
            >
              Принять участие
            </Button>
          )}
          <Button onClick={() => handleCancel()}>Отмена</Button>
          {formState?.userId == authStore.getCurrentUserId && (
            <Button onClick={() => handleOk()} type="primary">
              Сохранить
            </Button>
          )}
        </>
      }
    >
      <Spin spinning={isLoading}>
        <Form
          style={{ pointerEvents: formState?.userId == authStore.getCurrentUserId ? "auto" : "none" }}
          layout="vertical"
        >
          <Form.Item label="Название">
            <Input
              value={formState?.name ?? ""}
              onInput={(event: React.FormEvent<HTMLInputElement>) =>
                setFormState({
                  ...formState,
                  name: event.currentTarget.value,
                })
              }
              placeholder="Название"
            />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}

export const TournamentEditViewDialog = observer(Dialog);
