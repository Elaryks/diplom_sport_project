import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Spin } from "antd";
import { api } from "../../services";
import { showMessage } from "../../helpers/notifierHelpers";
import { getUserAmpluaById } from "../../helpers/userHelpers";
import { UserModel } from "../../api/models/userModel";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../hooks/useRootStore";

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
  const [formState, setFormState] = useState<UserModel | null>(null);
  const [userTeam, setUserTeam] = useState<string>("");

  const handleFetchData = async () => {
    if (props.itemId == null) return;
    setIsLoading(true);
    const r = await api.user.getById(props.itemId);
    setIsLoading(false);
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    setFormState(r);
    if (r.teamId != null) {
      const rr = await api.team.getById(r.teamId);
      setUserTeam(rr?.name ?? "");
    }
  };

  const handleSave = async () => {
    if (formState == null) return;
    setIsLoading(true);
    const r = await api.user.edit(formState?.id as number, formState);
    setIsLoading(false);
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    showMessage("Участник успешно изменен");
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
      setUserTeam("");
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
      title="Участник"
      cancelText="Отмена"
      okText="Сохранить"
      visible={props.isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <>
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
          <Form.Item label="Участник">
            <Input
              value={
                (formState?.lastName ?? "") + " " + (formState?.firstName ?? "") + " " + (formState?.middleName ?? "")
              }
              placeholder="Участник"
            />
          </Form.Item>
          <Form.Item label="Команда">
            <Input value={userTeam} placeholder="Команда" />
          </Form.Item>
          <Form.Item label="Амплуа">
            <Input
              value={formState?.amplua != null ? getUserAmpluaById(Number(formState.amplua)) : ""}
              placeholder="Амплуа"
            />
          </Form.Item>
          <Form.Item label="Рост (см)">
            <Input value={formState?.height ?? "Не указано"} placeholder="Рост (см)" />
          </Form.Item>
          <Form.Item label="Вес (кг)">
            <Input value={formState?.weight ?? "Не указано"} placeholder="Вес (кг)" />
          </Form.Item>
          <Form.Item label="Дата рождения">
            <Input
              value={formState?.birthDate != null ? new Date(formState.birthDate).toLocaleDateString() : "Не указано"}
              placeholder="Дата рождения"
            />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}

export const PlayerEditViewDialog = observer(Dialog);
