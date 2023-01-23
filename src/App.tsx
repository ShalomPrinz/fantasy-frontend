import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserProvider } from "./features/authentication";
import Router from "./pages/Router";

import "./App.css";

function App() {
  return (
    <UserProvider>
      <ToastContainer autoClose={2500} pauseOnFocusLoss={false} />
      <Router />
    </UserProvider>
  );
}

export default App;
