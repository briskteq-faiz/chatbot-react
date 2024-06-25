import { Dispatch, SetStateAction } from "react";
import { JSX as JSX_2 } from "react/jsx-runtime";

declare function Chatbot({
  modal,
  messages,
  setMessages,
  className,
  title,
  botMessageClassName,
  userMessageClassName,
  botMessageNotchClassName,
  userMessageNotchClassName,
  getResponse,
  loading,
  setLoading,
  handleStopStream,
}: {
  modal?: boolean;
  messages: MessageType[];
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
  title: string;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  className?: string;
  botMessageClassName?: string;
  userMessageClassName?: string;
  botMessageNotchClassName?: string;
  userMessageNotchClassName?: string;
  getResponse: () => void;
  handleStopStream: () => void;
}): JSX_2.Element;
export default Chatbot;

declare type MessageType = {
  source: "bot" | "user";
  text: string;
};

export {};
