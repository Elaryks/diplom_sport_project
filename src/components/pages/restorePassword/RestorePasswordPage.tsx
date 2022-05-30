import React, { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { FiAtSign } from "react-icons/fi";
import { Link } from "react-router-dom";

export function RestorePasswordPage() {
  const [formState, setFormState] = useState({
    email: "",
  });

  const handleSignup = () => {
    //
  };

  return (
    <div className="d-flex flex-column align-center justify-center" style={{ width: "100%", height: "100%" }}>
      <Typography.Title level={3} style={{ marginBottom: "24px" }}>
        Восстановление пароля
      </Typography.Title>
      <Form
        layout="vertical"
        style={{ width: "280px" }}
        name="loginForm"
        className="login-form"
        onFinish={handleSignup}
      >
        <Form.Item label="E-mail" name="username" rules={[{ required: true, message: "Пожалуйста, введите E-mail!" }]}>
          <Input
            value={formState.email}
            onInput={(event: any) => setFormState({ ...formState, email: event.target.value })}
            prefix={<FiAtSign className="site-form-item-icon" />}
            placeholder="E-mail"
          />
        </Form.Item>

        <Form.Item>
          <Button
            // disabled={formState.email.length == 0}
            block
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Восстановить пароль
          </Button>
          <Link className="mt-2 d-block" to="/login">
            Вход
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}
