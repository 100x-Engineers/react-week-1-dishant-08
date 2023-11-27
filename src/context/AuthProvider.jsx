import { useContext, useState } from "react";
import { TweetList } from "../constants";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [tweet, setTweet] = useState(TweetList);
  const [showModal, SetModal] = useState(false);
  const [formData, setFormData] = useState({});

  return (
    <>
      <AuthContext.Provider
        value={{ tweet, setTweet, showModal, SetModal, formData, setFormData }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
