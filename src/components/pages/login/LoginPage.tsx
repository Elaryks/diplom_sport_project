import React from "react";
import { Button, Form, Input, Typography } from "antd";
import { FiAtSign, FiLock } from "react-icons/fi/index";
import { Link } from "react-router-dom";

export function LoginPage() {
  const handleLogin = () => {
    //
  };

  const handleLoginFail = () => {
    //
  };

  return (
    <div className="d-flex flex-column align-center justify-center" style={{ width: "100%", height: "100%" }}>
      <Typography.Title level={3} style={{ marginBottom: "24px" }}>
        Вход
      </Typography.Title>
      <Form layout="vertical" style={{ width: "280px" }} name="loginForm" className="login-form" onFinish={handleLogin}>
        <Form.Item label="E-mail" name="username" rules={[{ required: true, message: "Пожалуйста, введите E-mail!" }]}>
          <Input prefix={<FiAtSign className="site-form-item-icon" />} placeholder="E-mail" />
        </Form.Item>
        <Form.Item label="Пароль" name="password" rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}>
          <Input.Password prefix={<FiLock className="site-form-item-icon" />} type="password" placeholder="Пароль" />
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
