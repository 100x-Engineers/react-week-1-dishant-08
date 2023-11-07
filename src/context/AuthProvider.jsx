import { useState } from "react";
import { TweetList } from "../constants";
import { AuthContext } from "./AuthContext";

export default function AuthProvider( {children} ){
const [tweet , setTweet] =  useState(TweetList);

return (
    <>
    <AuthContext.Provider value = {{tweet ,setTweet}}>
      {children}
    </AuthContext.Provider>
    </>
)
    
}