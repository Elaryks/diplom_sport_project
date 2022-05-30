import React from "react";
import { Button, DatePicker, Form, Input, Select, Typography } from "antd";
import { FiAtSign, FiLock, FiUser } from "react-icons/fi";

export function ProfilePage() {
  const handleChange = () => {
    //
  };

  return (
    <div className="d-flex flex-column align-center justify-center" style={{ width: "100%", height: "100%" }}>
      <Typography.Title level={3} style={{ marginBottom: "24px" }}>
        Профиль
      </Typography.Title>
      <Form
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
            name="username"
            rules={[{ required: true, message: "Пожалуйста, введите E-mail!" }]}
          >
            <Input prefix={<FiAtSign className="site-form-item-icon" />} placeholder="E-mail" />
          </Form.Item>
          <Form.Item
            style={{ flexBasis: "50%" }}
            label="Новый пароль"
            name="password"
            rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
          >
            <Input.Password prefix={<FiLock className="site-form-item-icon" />} type="password" placeholder="Пароль" />
          </Form.Item>
        </div>

        <div className="d-stack-column spacing-2">
          <Form.Item
            className="flex-grow-1"
            label="Фамилия"
            name="lasName"
            rules={[{ required: true, message: "Пожалуйста, введите Фамилию!" }]}
          >
            <Input prefix={<FiUser className="site-form-item-icon" />} placeholder="Фамилия" />
          </Form.Item>
          <Form.Item
            style={{ flexBasis: "50%" }}
            label="Имя"
            name="firstName"
            rules={[{ required: true, message: "Пожалуйста, введите имя!" }]}
          >
            <Input prefix={<FiUser className="site-form-item-icon" />} placeholder="Имя" />
          </Form.Item>
          <Form.Item style={{ flexBasis: "50%" }} label="Отчество (Если есть)" name="middleName">
            <Input prefix={<FiUser className="site-form-item-icon" />} placeholder="Отчество (Если есть)" />
          </Form.Item>
        </div>

        <div className="d-stack spacing-2 align-end">
          <Form.Item style={{ flexBasis: "50%" }} name="role" label="Амплуа">
            <Select placeholder="Амплуа">
              <Select.Option key="1" children="Нападающий" />
              <Select.Option key="2" children="Защитник" />
              <Select.Option key="3" children="Центровой" />
            </Select>
          </Form.Item>
          <Form.Item style={{ flexBasis: "50%" }} label="Дата рождения" name="birthday">
            <DatePicker style={{ width: "100%" }} placeholder="Дата рождения" />
          </Form.Item>
        </div>

        <div className="d-stack spacing-2 align-end">
          <Form.Item style={{ flexBasis: "33%" }} name="height" label="Рост (см)">
            <Input placeholder="Рост (см)" />
          </Form.Item>
          <Form.Item style={{ flexBasis: "33%" }} name="weight" label="Вес (кг)">
            <Input placeholder="Вес (кг)" />
          </Form.Item>
          <Form.Item style={{ flexBasis: "33%" }} name="gender" label="Пол">
            <Select placeholder="Пол">
              <Select.Option key="1" children="Мужской" />
              <Select.Option key="2" children="Женский" />
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
    </div>
  );
}
