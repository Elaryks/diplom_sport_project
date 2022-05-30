import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { topMenuLinks } from "../../../utils";
import { FiUser } from "react-icons/fi/index";

interface ITopMenuView {
  isAuthorized?: boolean;
}

const LinkItem = (link: string, text: string, icon?: React.ReactElement) => {
  return (
    <Link
      to={link}
      children={
        <div className="d-stack align-center spacing-2">
          {icon && <div className="d-flex align-center" children={icon} />}
          <span children={text} />
        </div>
      }
    />
  );
};

export function TopMenuView(props: ITopMenuView) {
  return (
    <Menu theme="dark" mode="horizontal">
      {topMenuLinks.map((item) => (
        <Menu.Item className={window.location.pathname == item.link ? "ant-menu-item-selected" : ""} key={item.key}>
          {LinkItem(item.link, item.text, item.icon)}
        </Menu.Item>
      ))}
      <Menu.Item className={window.location.pathname == "/profile" ? "ant-menu-item-selected ml-auto" : "ml-auto"}>
        {LinkItem(
          props.isAuthorized ? "/profile" : "/login",
          props.isAuthorized ? "Личный кабинет" : "Вход",
          <FiUser />
        )}
      </Menu.Item>
    </Menu>
  );
}
