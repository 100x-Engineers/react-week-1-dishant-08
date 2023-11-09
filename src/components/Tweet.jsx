import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Card from "./card";

export default function Tweet() {
  const { tweet } = useContext(AuthContext);
  return (
    <>
      {[...tweet].reverse().map((twt) => {
        return <Card key={twt.id} text={twt.content} />;
      })}
    </>
  );
}
