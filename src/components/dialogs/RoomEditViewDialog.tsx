import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Spin } from "antd";
import { api } from "../../services";
import { showMessage } from "../../helpers/notifierHelpers";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../hooks/useRootStore";
import { LocationModel } from "../../api/models/locationModel";

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
  const [formState, setFormState] = useState<LocationModel | null>(null);

  const handleFetchData = async () => {
    if (props.itemId == null) return;
    setIsLoading(true);
    const r = await api.location.getById(props.itemId);
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
    const r = await api.location.edit(formState?.id as number, formState);
    setIsLoading(false);
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    showMessage("Место проведения успешно изменено");
    props.onSuccess();
    handleCancel();
  };

  const handleDelete = async () => {
    const r = await api.location.del(formState as LocationModel);
    if (r == null || r == false) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    showMessage("Место проведения успешно удалено");
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
      title="Место проведения"
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
          <Form.Item label="Контактные данные">
            <Input
              value={formState?.contact ?? ""}
              onInput={(event: React.FormEvent<HTMLInputElement>) =>
                setFormState({
                  ...formState,
                  contact: event.currentTarget.value,
                })
              }
              placeholder="Контактные данные"
            />
          </Form.Item>
          <Form.Item label="Вместимость">
            <Input
              value={String(formState?.capacity ?? 0)}
              onInput={(event: React.FormEvent<HTMLInputElement>) =>
                setFormState({
                  ...formState,
                  capacity: Number(event.currentTarget.value ?? 0),
                })
              }
              min="0"
              type="number"
              placeholder="Вместимость"
            />
          </Form.Item>
          <Form.Item label="Адрес">
            <Input
              value={formState?.address ?? ""}
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
      </Spin>
    </Modal>
  );
}

export const RoomEditViewDialog = observer(Dialog);
