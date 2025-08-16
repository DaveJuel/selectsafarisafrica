import {
  CloseButton,
  HeaderTitle,
  OverlayFooter,
  OverlayHeader,
  SidePanelContent,
  SidePanelOverlay,
  OverlayBody,
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
import { useTranslation } from "react-i18next";
import { fetchEntityData } from "../../utils/RequestHandler";

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
  const [activities, setActivities] = useState([]);

  const { t } = useTranslation("adventures");
  const SHORT_YES = new Set([
    "yes",
    "y",
    "yeah",
    "yep",
    "yup",
    "ok",
    "okay",
    "sure",
    "please",
    "go on",
    "continue",
    "more",
    "tell me",
  ]);
  const SHORT_NO = new Set([
    "no",
    "n",
    "nope",
    "nah",
    "stop",
    "cancel",
    "not really",
  ]);

  const classifyUserReply = (text) => {
    const t = text.trim().toLowerCase();
    if (SHORT_YES.has(t) || /^y(es)?$/.test(t)) return "yes";
    if (SHORT_NO.has(t)) return "no";
    return "other";
  };

  const extractLastQuestion = (text) => {
    if (!text) return null;
    const matches = text.match(/[^?]*\?/g);
    return matches ? matches[matches.length - 1].trim() : null;
  };

  const chatEndRef = useRef(null);

  const sendMessageToAgent = async ({
    message,
    topic,
    country,
    city,
    video,
    history,
    lastAiQuestion,
    userReplyType,
  }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          topic,
          country,
          city,
          video,
          history,
          last_ai_question: lastAiQuestion,
          user_reply_type: userReplyType,
          activities: activities,
        }),
      });

      const data = await response.json();
      let aiReply = data.reply;
      try {
        const parsed = JSON.parse(data.reply);
        if (parsed.reply) aiReply = parsed.reply;
      } catch {
        /* keep aiReply as-is */
      }

      return aiReply;
    } catch (err) {
      return `⚠️ Network error: ${err.message}`;
    }
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetchEntityData("activities");
        if (response.success) {
          const results = response.result;
          const { country } = video;
          setActivities(
            results?.filter(
              (item) => item.country.toLowerCase() === country.toLowerCase()
            )
          );
        }
      } catch (error) {
        console.error(`Failed to fetch activities`, error);
      }
    };

    const initiateConversation = async () => {
      try {
        setAwaitingReply(true);
        const { caption, country, city } = video;
        const greetingMessage = `Hello! I'd like to know about ${t(
          caption
        )} in ${country}. details I want: budget, recommended visit time, what I need to carry and other details you find relevant.`;
        const aiReply = await sendMessageToAgent({
          message: greetingMessage,
          topic: t(caption),
          country,
          city,
          video,
        });
        setMessages((prev) => [...prev, { sender: "ai", content: aiReply }]);
        fetchActivities();
      } catch (e) {
        console.error(`Something went wrong ${e}`);
      } finally {
        setAwaitingReply(false);
      }
    };

    initiateConversation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, video]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isVisible, messages, awaitingReply]);

  if (!isVisible || !videoPosition) return null;

  const handleSend = async () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", content: message }]);
    setMessage("");
    setAwaitingReply(true);

    const { caption, country, city } = video;
    const lastAi = [...messages].reverse().find((m) => m.sender === "ai");
    const lastAiQuestion = lastAi ? extractLastQuestion(lastAi.content) : null;
    const userReplyType = classifyUserReply(message);
    const recentHistory = [
      ...messages,
      { sender: "user", content: message },
    ].slice(-12);

    const aiReply = await sendMessageToAgent({
      message,
      topic: t(caption),
      country,
      city,
      video,
      history: recentHistory,
      lastAiQuestion,
      userReplyType,
    });

    setMessages((prev) => [...prev, { sender: "ai", content: aiReply }]);
    setAwaitingReply(false);
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
          {!awaitingReply && messages.length === 0 ? (
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
