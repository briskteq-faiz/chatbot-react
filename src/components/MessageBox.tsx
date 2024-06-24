import React from "react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Label } from "../components/ui/label";
import { cn } from "../lib/utils";
export default function MessageBox({
  source,
  text,
  boxClassName,
}: {
  source: string;
  text: string;
  boxClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-4",
        source === "user" ? "self-end" : "self-start"
      )}
    >
      <Avatar>
        {source === "bot" ? <AvatarFallback>BT</AvatarFallback> : null}
      </Avatar>

      <Label
        className={cn(
          "px-4 py-2 rounded-xl max-w-4/5 mt-2 relative border-0 text-sm break-words",
          source === "bot"
            ? "rounded-ss-none bg-blue-500 text-primary-foreground rounded-bl-md"
            : "rounded-se-none bg-secondary rounded-br-md",
          boxClassName
        )}
      >
        {text}
        {source === "bot" ? (
          <div
            className={cn(
              "absolute border-s-8 border-blue-500 top-0 -left-4",
              "border-t-0 border-t-transparent border-r-[12px]",
              "border-l-transparent border-b-[12px] border-b-transparent"
            )}
          ></div>
        ) : (
          <div
            className={cn(
              "absolute border-s-8 border-secondary top-0 -right-1.5",
              "border-t-0 border-t-transparent border-l-[12px]",
              "border-r-transparent border-b-[12px] border-b-transparent"
            )}
          ></div>
        )}
      </Label>

      <Avatar>
        {source === "user" ? <AvatarFallback>US</AvatarFallback> : null}
      </Avatar>
    </div>
  );
}
