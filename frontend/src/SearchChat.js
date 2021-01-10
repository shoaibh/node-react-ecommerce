import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const SearchChat = (props) => {
  const search = props.previousStep.message.toLowerCase();
  const history = useHistory();
  useEffect(() => {
    history.push(`${search}`);
  }, []);

  return <div>You can look for your desired item here</div>;
};

export default SearchChat;
