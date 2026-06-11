import { useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  // Modal states
  const [showModal, SetModal] = useState(false);
  const [showTweetModal, SetShowTweetModal] = useState(false);
  const [showEditModal, SetShowEditModal] = useState(false);

  // Current logged in user
  const [currentLogUser, setcurrentLogUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        // Modal controls
        showModal,
        SetModal,
        showTweetModal,
        SetShowTweetModal,
        showEditModal,
        SetShowEditModal,

        // Current user
        currentLogUser,
        setcurrentLogUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
