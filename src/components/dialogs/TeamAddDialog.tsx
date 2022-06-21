import React, { useState } from "react";
import { Form, Input, Modal } from "antd";
import { api } from "../../services";
import { showMessage } from "../../helpers/notifierHelpers";
import { TeamModel } from "../../api/models/teamModel";

interface ITeamAddDialog {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

const initState: TeamModel = {
  name: "",
  address: "",
};

export function TeamAddDialog(props: ITeamAddDialog) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<TeamModel>(initState);

  const handleCreate = async () => {
    setIsLoading(true);
    const r = await api.team.create(formState);
    setIsLoading(false);
    if (r == null) {
      showMessage("Что-то пошло не так", "Убедитесь, что данные заполнены верно", "error");
      return;
    }
    showMessage("Команда успешно добавлена", undefined, "success");
    props.onSuccess();
    handleCancel();
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
      title="Добавить команду"
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
