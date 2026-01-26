import { useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  // Modal states
  const [showModal, SetModal] = useState(false);
  const [showTweetModal, SetShowTweetModal] = useState(false);
  const [showEditModal, SetShowEditModal] = useState(false);

  // Form data for multi-step registration
  const [formData, setFormData] = useState({});

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

        // Form data
        formData,
        setFormData,

        // Current user
        currentLogUser,
        setcurrentLogUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
