import React from "react";
import { Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import { topMenuLinks } from "../../../utils";
import { FiUser } from "react-icons/fi/index";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../hooks/useRootStore";

interface ITopMenuView {
  isAuthorized?: boolean;
  handleLogOut: () => void;
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

function TopMenu(props: ITopMenuView) {
  const { authStore } = useRootStore();

  return (
    <Menu className="ml-auto mr-auto" style={{ maxWidth: "1600px" }} theme="dark" mode="horizontal">
      {topMenuLinks.map((item) => (
        <Menu.Item className={window.location.pathname == item.link ? "ant-menu-item-selected" : ""} key={item.key}>
          {LinkItem(item.link, item.text, item.icon)}
        </Menu.Item>
      ))}
      <Dropdown
        overlay={
          authStore.isAuthorized ? (
            <Menu items={[{ key: 0, label: <div onClick={props.handleLogOut} children="Выход" /> }]} />
          ) : (
            <div />
          )
        }
      >
        <Menu.Item className={window.location.pathname == "/profile" ? "ant-menu-item-selected ml-auto" : "ml-auto"}>
          {LinkItem(props.isAuthorized ? "/profile" : "/login", props.isAuthorized ? "Профиль" : "Вход", <FiUser />)}
        </Menu.Item>
      </Dropdown>
    </Menu>
  );
}

export const TopMenuView = observer(TopMenu);
