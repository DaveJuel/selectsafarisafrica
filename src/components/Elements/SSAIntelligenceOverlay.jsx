import { useTranslation } from "react-i18next";
import {
  CloseButton,
  HeaderTitle,
  OverlayBody,
  OverlayFooter,
  OverlayHeader,
  SidePanelContent,
  SidePanelOverlay,
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
  const { t } = useTranslation("adventures");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [awaitingReply, setAwaitingReply] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, awaitingReply]);

  if (!isVisible || !videoPosition) return null;

  const handleSend = () => {
    if (!message.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", content: message }]);
    setMessage("");

    // Simulate AI response
    setAwaitingReply(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", content: "This is a response from the expert." },
      ]);
      setAwaitingReply(false);
    }, 1000);
  };

  const isLeftSide = videoIndex >= 2;

  return (
    <SidePanelOverlay isLeftSide={isLeftSide}>
      <SidePanelContent>
        <OverlayHeader>
          <HeaderTitle>{t(video?.caption)}</HeaderTitle>
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
              placeholder="Type here..."
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
