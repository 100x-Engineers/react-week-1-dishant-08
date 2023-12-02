import { useContext, useState } from "react";
import { TweetList } from "../constants";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [tweet, setTweet] = useState(TweetList);
  const [showModal, SetModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [showTweetModal, SetShowTweetModal] = useState(false);
  const [showEditModal, SetShowEditModal] = useState(false);

  return (
    <>
      <AuthContext.Provider
        value={{
          tweet,
          setTweet,
          showModal,
          SetModal,
          formData,
          setFormData,
          showTweetModal,
          SetShowTweetModal,
          showEditModal,
          SetShowEditModal,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
