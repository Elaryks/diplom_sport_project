import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select, Typography } from "antd";
import { FiAtSign, FiLock, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../services";
import { UserModel } from "../../../api/models/userModel";
import moment from "moment";
import { useRootStore } from "../../../hooks/useRootStore";
import { showMessage } from "../../../helpers/notifierHelpers";

export function SignupPage() {
  const navigate = useNavigate();
  const { authStore } = useRootStore();

  const [formState, setFormState] = useState<UserModel>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: "",
    height: undefined,
    weight: undefined,
    amplua: undefined,
    gender: undefined,
    teamId: undefined,
    role: 1,
    isActivated: false,
  });

  const handleSignup = async () => {
    // Функция для регистрации пользователя
    // if (formState.email.length == 0 || formState.password.length == 0) return;
    const res = await api.auth.signUp(formState);
    if (res == null) {
      showMessage("Что-то пошло не так", "Убедитесь, что данные введены верно", "error");
      return;
    }
    showMessage("Вы успешно зарегистрировались");
    authStore.setRefreshToken(res.tokens.refreshToken);
    authStore.setAccessToken(res.tokens.accessToken);
    authStore.setUserData(res.user);
    navigate("/game");
  };

  return (
    <div className="d-flex flex-column align-center justify-center" style={{ width: "100%", height: "100%" }}>
      <Typography.Title level={3} style={{ marginBottom: "24px" }}>
        Регистрация
      </Typography.Title>
      <Form
        requiredMark={false}
        layout="vertical"
        style={{ width: "560px" }}
        name="loginForm"
        className="login-form"
        onFinish={handleSignup}
      >
        <div className="d-stack spacing-2 align-end">
          <Form.Item
            style={{ flexBasis: "50%" }}
            label="E-mail"
            name="username"
            rules={[{ required: true, message: "Пожалуйста, введите E-mail!" }]}
          >
            <Input
              value={formState.email}
              onInput={(event: React.FormEvent<HTMLInputElement>) =>
                setFormState({
                  ...formState,
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
            name="password"
            rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
          >
            <Input.Password
              value={formState.password}
              onInput={(event: React.FormEvent<HTMLInputElement>) =>
                setFormState({
                  ...formState,
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
            name="lastName"
            rules={[{ required: true, message: "Пожалуйста, введите фамилию!" }]}
          >
            <Input
              value={formState.lastName}
              onInput={(event: React.FormEvent<HTMLInputElement>) =>
                setFormState({
                  ...formState,
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
            name="firstName"
            rules={[{ required: true, message: "Пожалуйста, введите имя!" }]}
          >
            <Input
              value={formState.firstName}
              onInput={(event: React.FormEvent<HTMLInputElement>) =>
                setFormState({
                  ...formState,
                  firstName: event.currentTarget.value,
                })
              }
              prefix={<FiUser className="site-form-item-icon" />}
              placeholder="Имя"
            />
          </Form.Item>
          <Form.Item style={{ flexBasis: "50%" }} label="Отчество (Если есть)" name="middleName">
            <Input
              value={formState.middleName}
              onInput={(event: React.FormEvent<HTMLInputElement>) =>
                setFormState({
                  ...formState,
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
            name="role"
            label="Амплуа"
            rules={[{ required: true, message: "Поле обязательно!" }]}
          >
            <Select
              value={String(formState.amplua ?? "")}
              onChange={(value) =>
                setFormState({
                  ...formState,
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
            name="birthday"
            rules={[{ required: true, message: "Поле обязательно!" }]}
          >
            <DatePicker
              value={formState.birthDate ? moment(formState.birthDate) : undefined}
              onChange={(value) =>
                setFormState({
                  ...formState,
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
            name="height"
            label="Рост (см)"
            rules={[{ required: true, message: "Поле обязательно!" }]}
          >
            <Input
              type="number"
              value={Number(formState.height ?? 0)}
              onInput={(event: React.FormEvent<HTMLInputElement>) =>
                setFormState({
                  ...formState,
                  height: Number(event.currentTarget.value ?? 0),
                })
              }
              min="0"
              placeholder="Рост (см)"
            />
          </Form.Item>
          <Form.Item
            style={{ flexBasis: "33%" }}
            name="weight"
            label="Вес (кг)"
            rules={[{ required: true, message: "Поле обязательно!" }]}
          >
            <Input
              type="number"
              value={Number(formState.weight ?? 0)}
              onInput={(event: React.FormEvent<HTMLInputElement>) =>
                setFormState({
                  ...formState,
                  weight: Number(event.currentTarget.value ?? 0),
                })
              }
              min="0"
              placeholder="Вес (кг)"
            />
          </Form.Item>
          <Form.Item
            style={{ flexBasis: "33%" }}
            name="gender"
            label="Пол"
            rules={[{ required: true, message: "Поле обязательно!" }]}
          >
            <Select
              value={String(formState.gender ?? "")}
              onChange={(value) =>
                setFormState({
                  ...formState,
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
            Зарегистрироваться
          </Button>
          <Link className="mt-2 d-block" to="/login">
            Войти
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}
