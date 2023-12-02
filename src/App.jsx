import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/home/index.jsx";
import Step1 from "./pages/Login/step1.jsx";
import Step2 from "./pages/Login/step2.jsx";
import Step3 from "./pages/Login/step3.jsx";
import Step4 from "./pages/Login/step4.jsx";
import Login from "./pages/Login/Login.jsx";
import Compose from "./pages/compose/index.jsx";
import User from "./pages/userProfile/index.jsx";
import AuthProvider from "./context/AuthProvider";
import Edit from "./pages/userProfile/editProfile.jsx";
import StepHeader from "./components/stepHeader.jsx";
import DesktopPage from "./pages/home/desktopPage.jsx";
import ErrorModal from "./components/modal/Errormodal.jsx";
import TweetModal from "./components/modal/tweetmodal.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    children: [
      {
        path: "/",
        element: <Step1 />,
      },
      {
        path: "/step2",
        element: <Step2 />,
      },
      {
        path: "/step3",
        element: <Step3 />,
      },
      {
        path: "/step4",
        element: <Step4 />,
      },
    ],
  },
  {
    path: "/tweet",
    element: <Compose />,
  },
  {
    path: "/test",
    element: <DesktopPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/user",
    element: <User />,
  },

  {
    path: "/editProfile",
    element: <Edit />,
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
