import React, { useEffect, useState } from "react";
import { Divider, Form, Input, Select, Table } from "antd";
import { api } from "../../../services";
import moment from "moment";
import { getUserAmpluaById, getUserGenderById } from "../../../helpers/userHelpers";
import { showMessage } from "../../../helpers/notifierHelpers";
import { playerTableColumns } from "../../../constants/tableColumns/playerTable";
import { PlayerEditViewDialog } from "../../dialogs/PlayerEditViewDialog";

// const RowDialog = (open: boolean, state: any, handleOk: () => void, handleCancel: () => void) => {
//   return (
//     <Modal
//       centered
//       title="Просмотр участника"
//       cancelText="Отмена"
//       okText="Сохранить"
//       visible={open}
//       destroyOnClose
//       onOk={handleOk}
//       onCancel={handleCancel}
//       footer={
//         <>
//           {/*<Button danger style={{ float: "left" }}>*/}
//           {/*  Удалить*/}
//           {/*</Button>*/}
//           <Button onClick={() => handleCancel()}>Закрыть</Button>
//           {/*<Button onClick={() => handleOk()} type="primary">*/}
//           {/*  Сохранить*/}
//           {/*</Button>*/}
//         </>
//       }
//     >
//       {state != null && (
//       )}
//     </Modal>
//   );
// };

export function PlayerPage() {
  const [isRowDialogVisible, setIsRowDialogVisible] = useState<boolean>(false);
  const [rowDialogItemId, setRowDialogItemId] = useState<number | null>(null);

  const [tableFilters, setTableFilters] = useState({
    playerName: "",
    playerAmplua: undefined,
    playerGender: undefined,
  });

  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleDataFetch = async () => {
    setIsLoading(true);
    const r = await api.user.getAll();
    setIsLoading(false);
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    setData(
      r
        .filter((i) => i.role == 1)
        .map((item, i) => ({
          id: item.id,
          key: i,
          name: item.lastName + " " + item.firstName + " " + item.middleName,
          team: item.teamId,
          role: item.amplua != null ? getUserAmpluaById(item.amplua) : "",
          height: item.height,
          weight: item.weight,
          birthDate: item.birthDate != null ? moment(item.birthDate).toDate().toLocaleDateString() : "",
          gender: item.gender != null ? getUserGenderById(item.gender) : "",
        }))
    );
  };

  useEffect(() => {
    handleDataFetch();
  }, []);

  return (
    <div className="d-stack-column spacing-2">
      <PlayerEditViewDialog
        isOpen={isRowDialogVisible}
        itemId={rowDialogItemId}
        isEditMode={false}
        onSuccess={() => handleDataFetch()}
        onClose={() => {
          setIsRowDialogVisible(false);
          setRowDialogItemId(null);
        }}
      />
      <Form style={{ width: "100%" }} className="d-stack spacing-2 no-margin-form" layout="vertical">
        <Form.Item label="Участник">
          <Input
            value={tableFilters.playerName}
            onInput={(event: React.FormEvent<HTMLInputElement>) =>
              setTableFilters({
                ...tableFilters,
                playerName: event.currentTarget.value,
              })
            }
            placeholder="ФИО участника"
            style={{ width: "250px" }}
          />
        </Form.Item>
        <Form.Item label="Амплуа">
          <Select
            style={{ width: "120px" }}
            value={tableFilters.playerAmplua}
            onChange={(value) => setTableFilters({ ...tableFilters, playerAmplua: value })}
            allowClear
            placeholder="Амплуа"
          >
            <Select.Option key="0" children="Нападающий" />
            <Select.Option key="1" children="Защитник" />
            <Select.Option key="2" children="Центровой" />
          </Select>
        </Form.Item>
        <Form.Item label="Пол">
          <Select
            style={{ width: "100px" }}
            value={tableFilters.playerGender}
            onChange={(value) => setTableFilters({ ...tableFilters, playerGender: value })}
            allowClear
            placeholder="Пол"
          >
            <Select.Option key="0" children="Мужской" />
            <Select.Option key="1" children="Женский" />
          </Select>
        </Form.Item>
      </Form>
      <Divider />
      <Table
        loading={isLoading}
        dataSource={data.filter(
          (item) =>
            item.name.toLowerCase().includes(tableFilters.playerName.toLowerCase()) &&
            (tableFilters.playerGender != null
              ? item.gender == getUserGenderById(Number(tableFilters.playerGender))
              : true) &&
            (tableFilters.playerAmplua != null
              ? item.role == getUserAmpluaById(Number(tableFilters.playerAmplua))
              : true)
        )}
        columns={playerTableColumns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowDialogItemId(record.id);
              setIsRowDialogVisible(true);
            },
          };
        }}
      />
    </div>
  );
}
