import React from "react";
import { Layout } from "antd";
import { TopMenu } from "../components/layout/TopMenu/TopMenu";

const { Header, Content } = Layout;

export function UnauthorizedLayout({ children }: { children: React.ReactNode }) {
  return (
    // <div className="app-wrapper__main">
    //   <div className="app-wrapper__child">{children}</div>
    // </div>
    <Layout className="d-flex-column" style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "100%" }}>
      <Header>
        {/*<div className="logo" />*/}
        <TopMenu isAuthorized={true} />
      </Header>
      <Layout className="flex-grow-1 ma-3 pa-3" style={{ overflow: "auto", background: "#fff" }}>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}
