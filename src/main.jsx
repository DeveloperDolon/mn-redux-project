import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import UserAuthListener from "./components/UserAuthListener/UserAuthListener";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "@smastrom/react-rating/style.css";
import { OnlineUsersProvider } from "./Pages/Inbox/onlineUsersContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <OnlineUsersProvider>
        <RouterProvider router={router} />
      </OnlineUsersProvider>
      <UserAuthListener />
      <Toaster />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
