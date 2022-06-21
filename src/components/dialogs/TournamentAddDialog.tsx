import React, { useEffect, useState } from "react";
import { Form, Input, Modal } from "antd";
import { api } from "../../services";
import { showMessage } from "../../helpers/notifierHelpers";
import { TournamentModel } from "../../api/models/tournamentModel";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../hooks/useRootStore";

interface ITournamentAddDialog {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

const initState: TournamentModel = {
  name: "",
  address: "",
  userId: undefined,
};

function Dialog(props: ITournamentAddDialog) {
  const { authStore } = useRootStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<TournamentModel>(initState);

  const handleCreate = async () => {
    setIsLoading(true);
    const r = await api.tournament.create(formState);
    setIsLoading(false);
    if (r == null) {
      showMessage("Что-то пошло не так", "Убедитесь, что данные заполнены верно", "error");
      return;
    }
    showMessage("Соревнование успешно добавлено", undefined, "success");
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

  useEffect(() => {
    setFormState({
      ...formState,
      userId: authStore.getCurrentUserId ?? undefined,
    });
  }, [props.isOpen]);

  return (
    <Modal
      centered
      title="Добавить соревнование"
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
      </Form>
    </Modal>
  );
}

export const TournamentAddDialog = observer(Dialog);
