import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/home/index.jsx";
import Step1 from "./pages/Login/Step1.jsx";
import Step2 from "./pages/Login/Step2.jsx";
import Step3 from "./pages/Login/Step3.jsx";
import Step4 from "./pages/Login/Step4.jsx";
import Login from "./pages/Login/Login.jsx";
import Compose from "./pages/compose/index.jsx";
import User from "./pages/userProfile/index.jsx";
import AuthProvider from "./context/AuthProvider";
import Edit from "./pages/userProfile/EditProfile.jsx";
import SignUpmodal from "./components/modal/SignUpModal.jsx";
import { ForyouTabContext } from "./context/AuthContext.jsx";
import { useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000, // 30 seconds
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    children: [
      {
        path: "/step1",
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
      {
        path: "/signup",
        element: <SignUpmodal />,
      },
    ],
  },
  {
    path: "/tweet",
    element: <Compose />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/user/:userName",
    element: <User />,
  },

  {
    path: "/editProfile",
    element: <Edit />,
  },
]);

function App() {
  const [tab, setTab] = useState(true);
  return (
    <QueryClientProvider client={queryClient}>
      <ForyouTabContext.Provider value={{ tab, setTab }}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ForyouTabContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
