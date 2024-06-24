"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const avatar_1 = require("../components/ui/avatar");
const label_1 = require("../components/ui/label");
const utils_1 = require("../lib/utils");
function MessageBox({ source, text, boxClassName, }) {
    return (react_1.default.createElement("div", { className: (0, utils_1.cn)("flex items-start gap-4", source === "user" ? "self-end" : "self-start") },
        react_1.default.createElement(avatar_1.Avatar, null, source === "bot" ? react_1.default.createElement(avatar_1.AvatarFallback, null, "BT") : null),
        react_1.default.createElement(label_1.Label, { className: (0, utils_1.cn)("px-4 py-2 rounded-xl max-w-4/5 mt-2 relative border-0 text-sm break-words", source === "bot"
                ? "rounded-ss-none bg-blue-500 text-primary-foreground rounded-bl-md"
                : "rounded-se-none bg-secondary rounded-br-md", boxClassName) },
            text,
            source === "bot" ? (react_1.default.createElement("div", { className: (0, utils_1.cn)("absolute border-s-8 border-blue-500 top-0 -left-4", "border-t-0 border-t-transparent border-r-[12px]", "border-l-transparent border-b-[12px] border-b-transparent") })) : (react_1.default.createElement("div", { className: (0, utils_1.cn)("absolute border-s-8 border-secondary top-0 -right-1.5", "border-t-0 border-t-transparent border-l-[12px]", "border-r-transparent border-b-[12px] border-b-transparent") }))),
        react_1.default.createElement(avatar_1.Avatar, null, source === "user" ? react_1.default.createElement(avatar_1.AvatarFallback, null, "US") : null)));
}
exports.default = MessageBox;
