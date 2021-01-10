import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const SearchChat = (props) => {
  const search = props.previousStep.message.toLowerCase();
  const history = useHistory();
  useEffect(() => {
    if (search == "energy" || search == "essentials")
      history.push(`/category/${search.split(" ").join("_")}`);
    else history.push(`/productList/${search.split(" ").join("_")}`);
  }, []);

  return <div>You can look for your desired item here</div>;
};

export default SearchChat;
