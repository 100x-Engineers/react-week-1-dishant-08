import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/index.jsx";
import Step1 from "./pages/Login/step1.jsx";
import Step2 from "./pages/Login/step2.jsx";
import Step3 from "./pages/Login/step3.jsx";
import Step4 from "./pages/Login/step4.jsx";
import Login from "./pages/Login/Login.jsx";
import Compose from "./pages/compose/index.jsx";
import User from "./pages/userProfile/index.jsx";
import Edit from "./pages/userProfile/editProfile.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
        <Route path="/step4" element={<Step4 />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tweet" element={<Compose />} />
        <Route path="/user" element={<User />} />
        <Route path="/editProfile" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
