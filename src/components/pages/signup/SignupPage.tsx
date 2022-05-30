import React from "react";
import { Button, Form, Input, Typography } from "antd";
import { FiAtSign, FiLock, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

export function SignupPage() {
  const handleSignup = () => {
    //
  };

  return (
    <div className="d-flex flex-column align-center justify-center" style={{ width: "100%", height: "100%" }}>
      <Typography.Title level={4} style={{ marginBottom: "24px" }}>
        Регистрация
      </Typography.Title>
      <Form
        layout="vertical"
        style={{ width: "280px" }}
        name="loginForm"
        className="login-form"
        onFinish={handleSignup}
      >
        <Form.Item label="E-mail" name="username" rules={[{ required: true, message: "Пожалуйста, введите E-mail!" }]}>
          <Input prefix={<FiAtSign className="site-form-item-icon" />} placeholder="E-mail" />
        </Form.Item>
        <Form.Item
          label="Фамилия"
          name="username"
          rules={[{ required: true, message: "Пожалуйста, введите Фамилию!" }]}
        >
          <Input prefix={<FiUser className="site-form-item-icon" />} placeholder="Фамилия" />
        </Form.Item>
        <Form.Item label="Имя" name="username" rules={[{ required: true, message: "Пожалуйста, введите имя!" }]}>
          <Input prefix={<FiUser className="site-form-item-icon" />} placeholder="Имя" />
        </Form.Item>
        <Form.Item label="Отчество" name="username">
          <Input prefix={<FiUser className="site-form-item-icon" />} placeholder="Отчество" />
        </Form.Item>
        <Form.Item label="Рост (см)" name="username">
          <Input prefix={<FiUser className="site-form-item-icon" />} placeholder="Рост (см)" />
        </Form.Item>
        <Form.Item label="Вес (кг)" name="username">
          <Input prefix={<FiUser className="site-form-item-icon" />} placeholder="Вес (кг)" />
        </Form.Item>
        <Form.Item label="Пароль" name="password" rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}>
          <Input prefix={<FiLock className="site-form-item-icon" />} type="password" placeholder="Пароль" />
        </Form.Item>
        <Form.Item
          label="Повторите пароль"
          name="password"
          rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
        >
          <Input prefix={<FiLock className="site-form-item-icon" />} type="password" placeholder="Повторите пароль" />
        </Form.Item>
        {/*<a className="login-form-forgot" href="">*/}
        {/*  Забыли пароль?*/}
        {/*</a>*/}

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
