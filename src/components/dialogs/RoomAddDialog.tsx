import React, { useState } from "react";
import { Form, Input, Modal } from "antd";
import { LocationModel } from "../../api/models/locationModel";
import { api } from "../../services";
import { showMessage } from "../../helpers/notifierHelpers";

interface IRoomAddDialog {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

const initState: LocationModel = {
  name: "",
  contact: "",
  capacity: undefined,
  address: "",
};

export function RoomAddDialog(props: IRoomAddDialog) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<LocationModel>(initState);

  const handleCreate = async () => {
    setIsLoading(true);
    const r = await api.location.create(formState);
    setIsLoading(false);
    if (r == null) {
      showMessage("Что-то пошло не так", "Убедитесь, что данные заполнены верно", "error");
      return;
    }
    showMessage("Место проведения успешно добавлено", undefined, "success");
    props.onSuccess();
  };

  const handleCancel = () => {
    if (isLoading) return;
    props.onClose();
    setTimeout(() => {
      setIsLoading(false);
      setFormState(initState);
    }, 350);
  };

  return (
    <Modal
      centered
      title="Добавить место проведения"
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
        <Form.Item label="Название">
          <Input
            value={formState.name}
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
            value={formState.contact}
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
            value={String(formState.capacity ?? 0)}
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
            value={formState.address}
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
    </Modal>
  );
}
