import { cn } from "../../../lib/utils";

type MessageBoxProps = {
  source: "bot" | "user";
  text: string;
  botMessageClassName?: string;
  userMessageClassName?: string;
  botMessageNotchClassName?: string;
  userMessageNotchClassName?: string;
  variant?: "small" | "large";
};

export default function MessageBox({
  source,
  text,
  botMessageClassName,
  userMessageClassName,
  botMessageNotchClassName,
  userMessageNotchClassName,
  variant = "large",
}: MessageBoxProps) {
  const isBot = source === "bot";
  return (
    <div
      className={cn(
        "flex mx-2",
        isBot ? "justify-start" : "justify-end",
        variant === "large" ? "py-2" : "py-1"
      )}
    >
      <div
        className={cn(
          "relative max-w-[75%] px-3 py-2 rounded-lg",
          isBot ? botMessageClassName : userMessageClassName
        )}
      >
        {text}
        <div
          className={cn(
            "absolute top-0 w-0 h-0 z-[1000]",
            isBot ? "-left-2" : "-right-2",
            isBot ? botMessageNotchClassName : userMessageNotchClassName,
            isBot
              ? "border-l-[16px] border-l-transparent"
              : "border-r-[16px] border-r-transparent",
            "border-t-[16px]"
          )}
        />
      </div>
    </div>
  );
}
