import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select, Spin, Typography } from "antd";
import { FiAtSign, FiLock, FiUser } from "react-icons/fi";
import { UserModel } from "../../../api/models/userModel";
import { api } from "../../../services";
import moment from "moment";
import { useRootStore } from "../../../hooks/useRootStore";
import { observer } from "mobx-react-lite";
import { showMessage } from "../../../helpers/notifierHelpers";

function Page() {
  const { authStore } = useRootStore();

  const [data, setData] = useState<UserModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleChange = async () => {
    setIsLoading(true);
    const r = await api.user.edit(data?.id as number, { ...data, password: undefined } as UserModel);
    setIsLoading(false);
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    await handleDataFetch();
    // setData({ ...r, password: undefined });
  };

  const handleDataFetch = async () => {
    setIsLoading(true);
    const r = await api.user.getById(authStore.getCurrentUserId as number);
    setIsLoading(false);
    if (r == null) {
      showMessage("Что-то пошло не так", undefined, "error");
      return;
    }
    setData({ ...r, password: undefined });
  };

  useEffect(() => {
    handleDataFetch();
  }, []);

  return (
    <div className="d-flex flex-column align-center justify-center" style={{ width: "100%", height: "100%" }}>
      <Typography.Title level={3} style={{ marginBottom: "24px" }}>
        Профиль
      </Typography.Title>
      <Spin size="large" spinning={isLoading}>
        <Form
          requiredMark={false}
          layout="vertical"
          style={{ width: "560px" }}
          name="loginForm"
          className="login-form"
          onFinish={handleChange}
        >
          <div className="d-stack spacing-2 align-end">
            <Form.Item
              style={{ flexBasis: "50%" }}
              label="E-mail"
              rules={[{ required: true, message: "Пожалуйста, введите E-mail!" }]}
            >
              <Input
                value={data?.email}
                onInput={(event: React.FormEvent<HTMLInputElement>) =>
                  setData({
                    ...data,
                    email: event.currentTarget.value,
                  })
                }
                prefix={<FiAtSign className="site-form-item-icon" />}
                placeholder="E-mail"
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              style={{ flexBasis: "50%" }}
              label="Пароль"
              rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
            >
              <Input.Password
                value={data?.password}
                onInput={(event: React.FormEvent<HTMLInputElement>) =>
                  setData({
                    ...data,
                    password: event.currentTarget.value,
                  })
                }
                prefix={<FiLock className="site-form-item-icon" />}
                type="password"
                placeholder="Пароль"
                autoComplete="off"
              />
            </Form.Item>
          </div>

          <div className="d-stack-column spacing-2">
            <Form.Item
              className="flex-grow-1"
              label="Фамилия"
              rules={[{ required: true, message: "Пожалуйста, введите фамилию!" }]}
            >
              <Input
                value={data?.lastName}
                onInput={(event: React.FormEvent<HTMLInputElement>) =>
                  setData({
                    ...data,
                    lastName: event.currentTarget.value,
                  })
                }
                prefix={<FiUser className="site-form-item-icon" />}
                placeholder="Фамилия"
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              style={{ flexBasis: "50%" }}
              label="Имя"
              rules={[{ required: true, message: "Пожалуйста, введите имя!" }]}
            >
              <Input
                value={data?.firstName}
                onInput={(event: React.FormEvent<HTMLInputElement>) =>
                  setData({
                    ...data,
                    firstName: event.currentTarget.value,
                  })
                }
                prefix={<FiUser className="site-form-item-icon" />}
                placeholder="Имя"
              />
            </Form.Item>
            <Form.Item style={{ flexBasis: "50%" }} label="Отчество (Если есть)">
              <Input
                value={data?.middleName}
                onInput={(event: React.FormEvent<HTMLInputElement>) =>
                  setData({
                    ...data,
                    middleName: event.currentTarget.value,
                  })
                }
                prefix={<FiUser className="site-form-item-icon" />}
                placeholder="Отчество (Если есть)"
                autoComplete="off"
              />
            </Form.Item>
          </div>

          <div className="d-stack spacing-2 align-end">
            <Form.Item
              style={{ flexBasis: "50%" }}
              label="Амплуа"
              rules={[{ required: true, message: "Поле обязательно!" }]}
            >
              <Select
                value={String(data?.amplua ?? "")}
                onChange={(value) =>
                  setData({
                    ...data,
                    amplua: Number(value ?? 0),
                  })
                }
                placeholder="Амплуа"
              >
                <Select.Option key="0" children="Нападающий" />
                <Select.Option key="1" children="Защитник" />
                <Select.Option key="2" children="Центровой" />
              </Select>
            </Form.Item>
            <Form.Item
              style={{ flexBasis: "50%" }}
              label="Дата рождения"
              rules={[{ required: true, message: "Поле обязательно!" }]}
            >
              <DatePicker
                value={data?.birthDate ? moment(data.birthDate) : undefined}
                onChange={(value) =>
                  setData({
                    ...data,
                    birthDate: value?.toDate()?.toISOString(),
                  })
                }
                style={{ width: "100%" }}
                placeholder="Дата рождения"
              />
            </Form.Item>
          </div>

          <div className="d-stack spacing-2 align-end">
            <Form.Item
              style={{ flexBasis: "33%" }}
              label="Рост (см)"
              rules={[{ required: true, message: "Поле обязательно!" }]}
            >
              <Input
                type="number"
                value={Number(data?.height ?? 0)}
                onInput={(event: React.FormEvent<HTMLInputElement>) =>
                  setData({
                    ...data,
                    height: Number(event.currentTarget.value ?? 0),
                  })
                }
                min="0"
                placeholder="Рост (см)"
              />
            </Form.Item>
            <Form.Item
              style={{ flexBasis: "33%" }}
              label="Вес (кг)"
              rules={[{ required: true, message: "Поле обязательно!" }]}
            >
              <Input
                type="number"
                value={Number(data?.weight ?? 0)}
                onInput={(event: React.FormEvent<HTMLInputElement>) =>
                  setData({
                    ...data,
                    weight: Number(event.currentTarget.value ?? 0),
                  })
                }
                min="0"
                placeholder="Вес (кг)"
              />
            </Form.Item>
            <Form.Item
              style={{ flexBasis: "33%" }}
              label="Пол"
              rules={[{ required: true, message: "Поле обязательно!" }]}
            >
              <Select
                value={String(data?.gender ?? "")}
                onChange={(value) =>
                  setData({
                    ...data,
                    gender: Number(value ?? 0),
                  })
                }
                placeholder="Пол"
              >
                <Select.Option key="0" children="Мужской" />
                <Select.Option key="1" children="Женский" />
              </Select>
            </Form.Item>
          </div>

          {/*<Form.Item label="Функция" name="username">*/}
          {/*  <Select placeholder="Функция">*/}
          {/*    <Select.Option>Организатор</Select.Option>*/}
          {/*    <Select.Option>Участник</Select.Option>*/}
          {/*    <Select.Option>Администратор</Select.Option>*/}
          {/*  </Select>*/}
          {/*</Form.Item>*/}

          <Form.Item>
            <Button block type="primary" htmlType="submit" className="login-form-button">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
}

export const ProfilePage = observer(Page);
