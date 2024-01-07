import { useContext, useState } from "react";
import { TweetList } from "../constants";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [tweet, setTweet] = useState(TweetList);
  const [showModal, SetModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [showTweetModal, SetShowTweetModal] = useState(false);
  const [showEditModal, SetShowEditModal] = useState(false);
  const [isLoading, SetLoading] = useState(false);
  const [render, Setrender] = useState(false);
  const [replyrender, Setreplyrender] = useState(false);
  const [currentLogUser, setcurrentLogUser] = useState();

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
          isLoading,
          SetLoading,
          render,
          Setrender,
          currentLogUser,
          setcurrentLogUser,
          replyrender,
          Setreplyrender,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
