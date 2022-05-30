import React from "react";
import AppRouter from "./components/service/appRouter/AppRouter";
import ru_RU from "antd/lib/locale/ru_RU";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider locale={ru_RU}>
      <AppRouter />
    </ConfigProvider>
  );
}

export default App;
