import React from "react";
import { Layout } from "antd";
import { TopMenu } from "../components/layout/TopMenu/TopMenu";
import background from "../assets/images/background.jpg";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../hooks/useRootStore";

const { Header, Content } = Layout;

function MainLayout({ children }: { children: React.ReactNode }) {
  const { authStore } = useRootStore()

  return (
    // <div className="app-wrapper__main">
    //   <div className="app-wrapper__child">{children}</div>
    // </div>
    <Layout
      className="d-flex-column"
      style={{
        background: `url(${background})`,
        backgroundSize: "cover",
        position: "absolute",
        left: 0,
        top: 0,
        height: "100%",
        width: "100%",
      }}
    >
      <Header style={{ borderBottom: "1px solid #1890FF80", boxSizing: "content-box" }} className="px-3">
        <TopMenu isAuthorized={authStore.isAuthorized} />
      </Header>
      <Layout
        className="flex-grow-1 ml-auto mr-auto my-3"
        style={{ maxWidth: "1600px", width: "calc(100% - 24px)", overflow: "auto", background: "#fff" }}
      >
        <Content className="ma-3">{children}</Content>
      </Layout>
    </Layout>
  );
}

export const DefaultLayout = observer(MainLayout);
