# react-chatbot-tailwind

**react-chatbot-tailwind** is a React component for integrating a customizable chatbot into your web applications. It supports modal and non-modal configurations, message threading, and dynamic message handling.

## Installation

You can install the package via npm or yarn:

```bash
npm install react-chatbot-tailwind
# or
yarn add react-chatbot-tailwind
# or
pnpm install react-chatbot-tailwind
```


Import the package where you want to use it:
```jsx
import { Chatbot } from 'react-chatbot-tailwind';
```

### IMPORTANT
Then import the CSS file in your project:
```jsx
import "react-chatbot-tailwind/dist/style.css";
```

## Usage

### Usage with Streaming API

```tsx
// pages/index.tsx
"use client";
import { useState } from "react";
import Chatbot from "react-chatbot-tailwind";
import "react-chatbot-tailwind/dist/style.css";

type MessageType = {
  source: "bot" | "user";
  text: string;
};

export default function Home() {
  const [messages, setMessages] = useState<MessageType[]>([
    { text: "Hello, how can I assist you today?", source: "bot" },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  const getResponse = () => {
    const eventSource = new EventSource("/api/chat");
    setEventSource(eventSource);
    setLoading(true);
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

      if (currentMessage.includes("###STOP###")) {
        setLoading(false);
        eventSource.close();
      }
    };

    eventSource.onerror = () => {
      setLoading(false);
      eventSource.close();
    };

    return () => {
      setLoading(false);
    };
  };

  const handleStopStream = () => {
    eventSource && eventSource.close();
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-between w-full">
      <div className="grow w-full">
        <Chatbot
          modal
          title="Chatbot"
          messages={messages}
          setMessages={setMessages}
          loading={loading}
          setLoading={setLoading}
          botMessageClassName="bg-red-600"
          userMessageClassName="bg-blue-600 text-white"
          botMessageNotchClassName="border-red-600"
          userMessageNotchClassName="border-blue-600"
          getResponse={getResponse}
          handleStopStream={handleStopStream}
        />
      </div>
    </main>
  );
}

```

## API

### Props

- `title`: Title of the chatbot.
- `modal` (optional): Boolean to toggle modal view.
- `messages`: Array of message objects containing source and text.
- `setMessages`: State setter function for messages.
- `loading`: Boolean indicating if the bot is processing a message.
- `setLoading`: State setter function for loading state.
- `className` (optional): Additional class names for the component.
- `botMessageClassName` (optional): Class names for bot messages.
- `userMessageClassName` (optional): Class names for user messages.
- `botMessageNotchClassName` (optional): Class names for bot message notch.
- `userMessageNotchClassName` (optional): Class names for user message notch.
- `getResponse`: Function to initiate fetching a response from the bot.
- `handleStopStream`: Function to stop the bot response stream.


### Styling

The appearance of the chatbot can be customized using Tailwind CSS classes. Feel free to adjust the styles to match your application's design.

### Features

- **Modal and Non-Modal Modes**: Choose between modal and non-modal configurations based on your UI/UX preferences.
- **Dynamic Messaging**: Handles dynamic messages from users and provides responses using server-side events.
- **Scrolling Behavior**: Automatically scrolls to the latest messages for a seamless chat experience.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Example

To see a working example, refer to the provided code snippets in the Usage section. Customize the Chatbot component with different styles, messages, and interaction logic as per your requirements.
