"use client";

import { MessageCircleMoreIcon, Send, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";
import MessageBox from "./MessageBox";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

type MessageType = {
  source: string;
  text: string;
};

export default function Chatbot({ modal }: { modal?: boolean }) {
  const [messages, setMessages] = useState<MessageType[]>([
    { text: "Hello, how can I assist you today?", source: "bot" },
  ]);

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

  const getResponse = () => {
    const eventSource = new EventSource("/api/chat");

    let currentMessage = "";
    eventSource.onmessage = (event) => {
      const parseData = event.data.replace("data: ", "");
      const message = parseData.replace("\n\n", "");
      currentMessage += message;
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1] = {
          text: currentMessage,
          source: "bot",
        };
        return updatedMessages;
      });
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  };

  const handleSendMessage = () => {
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
        className="fixed bottom-24 rounded-full right-16 p-2 bg-sky-400 cursor-pointer"
        onClick={() => setModalOpen(!modalOpen)}
      >
        <MessageCircleMoreIcon size={30} className="text-slate-100" />
      </div>

      {modalOpen ? (
        <Card
          className={cn(
            "absolute border-0 right-32 bottom-24",
            "flex flex-col grow justify-between max-w-[324px]",
            "shadow"
          )}
        >
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Chatbot</CardTitle>
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
              "gap-12 overflow-y-hidden h-[300px] "
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
                />
              ))}
              <div ref={scrollableRef} className="-mt-8" />
            </div>
          </CardContent>
          {/* INPUT DIV */}
          <CardContent className="p-3 pt-0 lg:px-6 self-end w-full">
            <div className="flex relative items-center justify-between gap-12 w-full">
              <Input
                placeholder="Type your message here"
                className="rounded-full px-4"
                value={inputValue}
                onChange={(event) => setInputValue(event.currentTarget.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Button
                className="flex items-center gap-2 absolute right-0 rounded-full"
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
    <Card className="w-full grow flex flex-col justify-between max-w-[824px]">
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
            />
          ))}
          <div ref={scrollableRef} className="-mt-8" />
        </div>
      </CardContent>
      {/* INPUT DIV */}
      <CardContent className="p-3 pt-0 lg:px-6 self-end w-full">
        <div className="flex relative items-center justify-between gap-12 w-full">
          <Input
            placeholder="Type your message here"
            className="rounded-full px-4"
            value={inputValue}
            onChange={(event) => setInputValue(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button
            className="flex items-center gap-2 absolute right-0 rounded-full"
            variant="link"
            onClick={handleSendMessage}
          >
            <Send size={20} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
