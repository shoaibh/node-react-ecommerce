import React from "react";
import "./ChatBot.css";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import ChatPedia from "./ChatPedia";
import SearchChat from "./SearchChat";

const theme = {
  background: "#f5f8fb",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#63de16",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#63de16",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#63de16",
};

const steps = [
  {
    id: "0",
    message: "Welcome to Paryavaran! \n Please select one of the options",
    trigger: "1",
  },
  {
    id: "1",
    options: [
      { value: 1, label: "Search Products", trigger: "2" },
      { value: 2, label: "Know about the Products", trigger: "KnowProducts" },
    ],
  },
  {
    id: "2",
    message: "You can either type or select from the options",
    trigger: "searchOptions",
  },
  {
    id: "searchOptions",
    options: [
      { value: 1, label: "Energy", trigger: "energy" },
      { value: 2, label: "Essentials", trigger: "essentials" },
      { value: 3, label: "I'll type", trigger: "searchBy" },
    ],
  },
  {
    id: "searchBy",
    message: "As you wish sir",
    trigger: "searchByText",
  },
  {
    id: "searchByText",
    user: true,
    trigger: "userType",
  },
  {
    id: "KnowProducts",
    message: "Type the thing you want to know about. e.g 'Green Products'",
    trigger: "typeToSearch",
  },
  {
    id: "typeToSearch",
    user: true,
    trigger: "wikiSearch",
  },
  {
    id: "wikiSearch",
    component: <ChatPedia />,
    waitAction: true,
    trigger: "1",
  },
  {
    id: "energy",
    component: <SearchChat search="energy" />,
    trigger: "end",
  },
  {
    id: "essentials",
    component: <SearchChat search="essentials" />,
    trigger: "end",
  },
  {
    id: "userType",
    component: <SearchChat />,
    trigger: "end",
  },
  {
    id: "end",
    message: "Anything else",
    trigger: "1",
  },
];

const ChatBotComponent = () => {
  return (
    <div className="chatBot">
      <ThemeProvider theme={theme}>
        <ChatBot steps={steps} floating={true} />
      </ThemeProvider>
    </div>
  );
};

export default ChatBotComponent;
