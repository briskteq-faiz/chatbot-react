import { MessageCircleMoreIcon, Send, StopCircle, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import MessageBox from "./MessageBox";

type MessageType = {
  source: "bot" | "user";
  text: string;
};

export default function Chatbot({
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
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = () => {
    setLoading(true);
    if (inputValue.trim() === "") return;
    setMessages((prev) => [
      ...prev,
      {
        text: inputValue,
        source: "user",
      },
      {
        text: "",
        source: "bot",
      },
    ]);
    setInputValue("");
    getResponse();
  };

  return modal ? (
    <div>
      <div
        className="fixed p-2 rounded-full cursor-pointer bottom-24 right-16 bg-sky-400"
        onClick={() => setModalOpen(!modalOpen)}
      >
        <MessageCircleMoreIcon size={30} className="text-slate-100" />
      </div>

      {modalOpen ? (
        <Card
          className={cn(
            "fixed border-0 right-32 bottom-24",
            "flex flex-col grow justify-between w-[324px]",
            "shadow-lg",
            className
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <X
              className="cursor-pointer"
              size={20}
              onClick={() => setModalOpen(false)}
            />
          </CardHeader>
          {/* MESSAGE DIV */}
          <CardContent
            className={cn(
              "flex flex-col items-center grow w-full",
              "gap-12 overflow-y-hidden h-[300px] pb-0 px-2"
            )}
          >
            <div
              className={cn(
                "grow h-[60vh] flex flex-col gap-3 w-full",
                "overflow-y-scroll overflow-x-hidden pb-8",
                "no-scrollbar text-sm"
              )}
            >
              {messages.map((message: MessageType, index: number) => (
                <MessageBox
                  variant="small"
                  key={index}
                  source={message.source}
                  text={message.text}
                  botMessageClassName={botMessageClassName}
                  userMessageClassName={userMessageClassName}
                  botMessageNotchClassName={botMessageNotchClassName}
                  userMessageNotchClassName={userMessageNotchClassName}
                />
              ))}
              <div ref={scrollableRef} className="-mt-8" />
            </div>
          </CardContent>
          {/* INPUT DIV */}
          <CardContent className="self-end w-full p-3 pt-0 lg:px-2">
            <div className="relative flex items-center justify-between w-full gap-12">
              <Input
                placeholder="Type your message here"
                className="px-4 rounded-full"
                value={inputValue}
                onChange={(event) => setInputValue(event.currentTarget.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Button
                className="absolute right-0 flex items-center gap-2 rounded-full"
                variant="link"
                onClick={handleSendMessage}
              >
                <Send size={20} />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  ) : (
    <Card
      className={cn(
        "grow flex flex-col justify-between",
        "w-full h-full",
        className
      )}
    >
      <CardHeader className="text-center">
        <CardTitle>Chatbot</CardTitle>
      </CardHeader>
      {/* MESSAGE DIV */}
      <CardContent
        className={cn(
          "flex flex-col items-center grow w-full",
          "gap-12 overflow-y-hidden h-[500px] py-0 pr-0 pl-2 lg:pl-6"
        )}
      >
        <div
          className={cn(
            "grow h-[60vh] flex flex-col gap-3 w-full",
            "overflow-y-scroll pb-8 pr-2 lg:pr-4",
            "no-scrollbar"
          )}
        >
          {messages.map((message: MessageType, index: number) => (
            <MessageBox
              key={index}
              source={message.source}
              text={message.text}
              botMessageClassName={botMessageClassName}
              userMessageClassName={userMessageClassName}
              botMessageNotchClassName={botMessageNotchClassName}
              userMessageNotchClassName={userMessageNotchClassName}
            />
          ))}
          <div ref={scrollableRef} className="-mt-8" />
        </div>
      </CardContent>
      {/* INPUT DIV */}
      <CardContent className="self-end w-full p-3 pt-0 lg:px-6">
        <div className="relative flex items-center justify-between w-full gap-12">
          <Input
            placeholder="Type your message here"
            className="px-4 rounded-full"
            disabled={loading}
            value={inputValue}
            onChange={(event) => setInputValue(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button
            className="absolute right-0 flex items-center gap-2 rounded-full"
            variant="link"
            onClick={() => {
              loading ? handleStopStream() : handleSendMessage();
            }}
          >
            {loading ? <StopCircle size={20} /> : <Send size={20} />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
