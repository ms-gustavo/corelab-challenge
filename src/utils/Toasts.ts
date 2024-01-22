import { toast } from "react-toastify";

export const toastError = (msg: string): void => {
  toast.error(`${msg}`, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
