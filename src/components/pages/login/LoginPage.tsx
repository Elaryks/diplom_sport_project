import React, { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { FiAtSign, FiLock } from "react-icons/fi/index";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../services";
import { AuthenticationModel } from "../../../api/models/authenticationModel";
import { useRootStore } from "../../../hooks/useRootStore";
import { showMessage } from "../../../helpers/notifierHelpers";

export function LoginPage() {
  const navigate = useNavigate();
  const { authStore } = useRootStore();

  const [formState, setFormState] = useState<AuthenticationModel>({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    // Функция для аутентификации пользователя
    if ((formState.email ?? "").trim().length == 0 || (formState.password ?? "").length == 0) return;
    const res = await api.auth.logIn(formState);
    if (res == null) {
      showMessage("Что-то пошло не так", "Убедитесь, что данные введены верно", "error");
      return;
    }
    showMessage("Вы успешно авторизовались");
    authStore.setRefreshToken(res.tokens.refreshToken);
    authStore.setAccessToken(res.tokens.accessToken);
    authStore.setUserData(res.user);
    navigate("/game");
  };

  return (
    <div className="d-flex flex-column align-center justify-center" style={{ width: "100%", height: "100%" }}>
      <Typography.Title level={3} style={{ marginBottom: "24px" }}>
        Вход
      </Typography.Title>
      <Form layout="vertical" style={{ width: "280px" }} name="loginForm" className="login-form" onFinish={handleLogin}>
        <Form.Item label="E-mail" name="username" rules={[{ required: true, message: "Пожалуйста, введите E-mail!" }]}>
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
          />
        </Form.Item>
        <Form.Item label="Пароль" name="password" rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}>
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
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" className="login-form-button">
            Войти
          </Button>
          <div className="mt-3 d-stack justify-space-between">
            <Link to="/signup">Зарегистрироваться</Link>
            {/*<Link className="login-form-forgot" to="/restore-password">*/}
            {/*  Забыли пароль?*/}
            {/*</Link>*/}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
