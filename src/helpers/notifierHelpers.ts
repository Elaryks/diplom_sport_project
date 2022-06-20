import { notification } from "antd";

export const showMessage = (message: string, description?: string, theme: "error" | "success" = "success") => {
  notification[theme]({
    message: message,
    description: description,
    placement: "bottomRight",
  });
};