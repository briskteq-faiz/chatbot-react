"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lucide_react_1 = require("lucide-react");
const react_1 = __importStar(require("react"));
const utils_1 = require("../lib/utils");
const MessageBox_1 = __importDefault(require("./MessageBox"));
const button_1 = require("./ui/button");
const card_1 = require("./ui/card");
const input_1 = require("./ui/input");
function Chatbot({ modal }) {
    const [messages, setMessages] = (0, react_1.useState)([
        { text: "Hello, how can I assist you today?", source: "bot" },
    ]);
    const [inputValue, setInputValue] = (0, react_1.useState)("");
    const [modalOpen, setModalOpen] = (0, react_1.useState)(false);
    const scrollableRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
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
        if (inputValue.trim() === "")
            return;
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
    return modal ? (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "fixed bottom-24 rounded-full right-16 p-2 bg-sky-400 cursor-pointer", onClick: () => setModalOpen(!modalOpen) },
            react_1.default.createElement(lucide_react_1.MessageCircleMoreIcon, { size: 30, className: "text-slate-100" })),
        modalOpen ? (react_1.default.createElement(card_1.Card, { className: (0, utils_1.cn)("absolute border-0 right-32 bottom-24", "flex flex-col grow justify-between max-w-[324px]", "shadow") },
            react_1.default.createElement(card_1.CardHeader, { className: "flex flex-row justify-between items-center" },
                react_1.default.createElement(card_1.CardTitle, null, "Chatbot"),
                react_1.default.createElement(lucide_react_1.X, { className: "cursor-pointer", size: 20, onClick: () => setModalOpen(false) })),
            react_1.default.createElement(card_1.CardContent, { className: (0, utils_1.cn)("flex flex-col items-center grow w-full", "gap-12 overflow-y-hidden h-[300px] ") },
                react_1.default.createElement("div", { className: (0, utils_1.cn)("grow h-[60vh] flex flex-col gap-3 w-full", "overflow-y-scroll pb-8 pr-2 lg:pr-4", "no-scrollbar") },
                    messages.map((message, index) => (react_1.default.createElement(MessageBox_1.default, { key: index, source: message.source, text: message.text }))),
                    react_1.default.createElement("div", { ref: scrollableRef, className: "-mt-8" }))),
            react_1.default.createElement(card_1.CardContent, { className: "p-3 pt-0 lg:px-6 self-end w-full" },
                react_1.default.createElement("div", { className: "flex relative items-center justify-between gap-12 w-full" },
                    react_1.default.createElement(input_1.Input, { placeholder: "Type your message here", className: "rounded-full px-4", value: inputValue, onChange: (event) => setInputValue(event.currentTarget.value), onKeyDown: (event) => {
                            if (event.key === "Enter") {
                                handleSendMessage();
                            }
                        } }),
                    react_1.default.createElement(button_1.Button, { className: "flex items-center gap-2 absolute right-0 rounded-full", variant: "link", onClick: handleSendMessage },
                        react_1.default.createElement(lucide_react_1.Send, { size: 20 })))))) : null)) : (react_1.default.createElement(card_1.Card, { className: "w-full grow flex flex-col justify-between max-w-[824px]" },
        react_1.default.createElement(card_1.CardHeader, { className: "text-center" },
            react_1.default.createElement(card_1.CardTitle, null, "Chatbot")),
        react_1.default.createElement(card_1.CardContent, { className: (0, utils_1.cn)("flex flex-col items-center grow w-full", "gap-12 overflow-y-hidden h-[500px] py-0 pr-0 pl-2 lg:pl-6") },
            react_1.default.createElement("div", { className: (0, utils_1.cn)("grow h-[60vh] flex flex-col gap-3 w-full", "overflow-y-scroll pb-8 pr-2 lg:pr-4", "no-scrollbar") },
                messages.map((message, index) => (react_1.default.createElement(MessageBox_1.default, { key: index, source: message.source, text: message.text }))),
                react_1.default.createElement("div", { ref: scrollableRef, className: "-mt-8" }))),
        react_1.default.createElement(card_1.CardContent, { className: "p-3 pt-0 lg:px-6 self-end w-full" },
            react_1.default.createElement("div", { className: "flex relative items-center justify-between gap-12 w-full" },
                react_1.default.createElement(input_1.Input, { placeholder: "Type your message here", className: "rounded-full px-4", value: inputValue, onChange: (event) => setInputValue(event.currentTarget.value), onKeyDown: (event) => {
                        if (event.key === "Enter") {
                            handleSendMessage();
                        }
                    } }),
                react_1.default.createElement(button_1.Button, { className: "flex items-center gap-2 absolute right-0 rounded-full", variant: "link", onClick: handleSendMessage },
                    react_1.default.createElement(lucide_react_1.Send, { size: 20 }))))));
}
exports.default = Chatbot;
