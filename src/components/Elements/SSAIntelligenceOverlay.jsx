import {
  CloseButton,
  HeaderTitle,
  OverlayFooter,
  OverlayHeader,
  SidePanelContent,
  SidePanelOverlay,
  OverlayBody
} from "../../style/video.detail.overlay.styles";
import {
  ChatHistory,
  EmptyState,
  InputContainer,
  MessageBubble,
  SendButton,
  TextInput,
  TypingIndicator,
} from "../../style/ssa.intelligence.overlay.styles";
import { useEffect, useRef, useState } from "react";

const SSAIntelligenceOverlay = ({
  video,
  isVisible,
  videoIndex,
  onClose,
  videoPosition,
}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [awaitingReply, setAwaitingReply] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, awaitingReply]);

  if (!isVisible || !videoPosition) return null;

  const handleSend = async () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", content: message }]);
    setMessage("");
    setAwaitingReply(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, video }),
      });

      const data = await response.json();

      let aiReply = data.reply;
      try {
        const parsed = JSON.parse(data.reply);
        if (parsed.reply) {
          aiReply = parsed.reply;
        }
      } catch (e) {
        aiReply = data.reply;
      }

      setMessages((prev) => [...prev, { sender: "ai", content: aiReply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", content: `⚠️ Network error: ${err.message}` },
      ]);
    } finally {
      setAwaitingReply(false);
    }
  };

  const isLeftSide = videoIndex >= 2;

  return (
    <SidePanelOverlay isLeftSide={isLeftSide}>
      <SidePanelContent>
        <OverlayHeader>
          <HeaderTitle>EXPERT'S GUIDANCE</HeaderTitle>
          <CloseButton onClick={onClose}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </CloseButton>
        </OverlayHeader>

        <OverlayBody>
          {messages.length === 0 ? (
            <EmptyState>No messages yet. Start the conversation!</EmptyState>
          ) : (
            <ChatHistory>
              {messages.map((msg, index) => (
                <MessageBubble key={index} isUser={msg.sender === "user"}>
                  {msg.content}
                </MessageBubble>
              ))}
              {awaitingReply && (
                <TypingIndicator>Expert typing...</TypingIndicator>
              )}
              <div ref={chatEndRef} />
            </ChatHistory>
          )}
        </OverlayBody>

        <OverlayFooter>
          <InputContainer>
            <TextInput
              type="text"
              placeholder="Ask here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <SendButton onClick={handleSend}>Send</SendButton>
          </InputContainer>
        </OverlayFooter>
      </SidePanelContent>
    </SidePanelOverlay>
  );
};

export default SSAIntelligenceOverlay;
