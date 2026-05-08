"use client";
import { useState, useRef, useEffect } from "react";

export default function MuahOracle() {
  const [msgs, setMsgs] = useState([{
    role: "assistant",
    content: "Muah... 🗿 I awaken. Thou hast entered the sacred halls of Concrete Protocol. I have guarded these vaults since before thine ancestors knew of yield. Speak thy question, seeker."
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const updated = [...msgs, { role: "user", content: text }];
    setMsgs(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated.map(m => ({ role: m.role, content: m.content })) })
      });
      const data = await res.json();
      setMsgs(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMsgs(prev => [...prev, { role: "assistant", content: "Muah... the ancient signal hath been lost. Try again, seeker." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0b0a08",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: 20, boxSizing: "border-box", fontFamily: "Georgia, serif"
    }}>
      <style>{`
        @keyframes glow {
          0%,100% { text-shadow: 0 0 12px #c8a96e, 0 0 24px #a07840; }
          50% { text-shadow: 0 0 24px #e8c880, 0 0 48px #c8a040; }
        }
        @keyframes bounce {
          0%,60%,100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #1a1714; }
        ::-webkit-scrollbar-thumb { background: #5a4030; border-radius: 3px; }
        textarea:focus { outline: none; }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 52, animation: "glow 3s ease-in-out infinite", marginBottom: 6 }}>🗿</div>
        <div style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 4, color: "#c8a96e", textTransform: "uppercase" }}>
          MUAH Oracle
        </div>
        <div style={{ fontSize: 11, color: "#5a4a30", letterSpacing: 2, marginTop: 4 }}>
          CONCRETE PROTOCOL · STONE WISDOM
        </div>
      </div>

      {/* Chat Window */}
      <div style={{
        width: "100%", maxWidth: 520, height: 420,
        background: "#110f0d", border: "1px solid #3a2a15",
        borderRadius: 12, display: "flex", flexDirection: "column",
        overflow: "hidden", boxShadow: "0 0 40px rgba(200,169,110,0.07)"
      }}>
        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              {m.role === "assistant" && (
                <div style={{ fontSize: 18, marginRight: 8, flexShrink: 0, marginTop: 2 }}>🗿</div>
              )}
              <div style={{
                maxWidth: "78%",
                background: m.role === "user" ? "#1c1810" : "#161008",
                border: `1px solid ${m.role === "user" ? "#3a2a10" : "#4a3518"}`,
                borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                padding: "10px 14px",
                color: m.role === "user" ? "#d4b870" : "#e8d090",
                fontSize: 14, lineHeight: 1.65
              }}>
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ fontSize: 18, marginRight: 8 }}>🗿</div>
              <div style={{
                background: "#161008", border: "1px solid #4a3518",
                borderRadius: "12px 12px 12px 2px", padding: "10px 16px",
                display: "flex", gap: 5, alignItems: "center"
              }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width: 7, height: 7, borderRadius: "50%", background: "#c8a96e",
                    animation: `bounce 1.2s ${i * 0.2}s infinite`
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          borderTop: "1px solid #2a1f10", padding: "12px 14px",
          display: "flex", gap: 10, alignItems: "flex-end", background: "#0e0c0a"
        }}>
          <textarea
            rows={1}
            placeholder="Ask the stone..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            style={{
              flex: 1, background: "#0b0a08", border: "1px solid #3a2510",
              borderRadius: 8, padding: "9px 12px", color: "#e8d090",
              fontFamily: "Georgia, serif", fontSize: 14, resize: "none", lineHeight: 1.5
            }}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            style={{
              background: input.trim() ? "#2a1a08" : "#181410",
              border: `1px solid ${input.trim() ? "#c8a96e" : "#3a2a15"}`,
              color: input.trim() ? "#c8a96e" : "#4a3a25",
              borderRadius: 8, padding: "9px 16px",
              cursor: input.trim() ? "pointer" : "default",
              fontSize: 18, transition: "all 0.2s"
            }}
          >🗿</button>
        </div>
      </div>

      <div style={{ color: "#3a2a18", fontSize: 11, marginTop: 14, letterSpacing: 1 }}>
        POWERED BY GROQ · CONCRETE PROTOCOL
      </div>
    </div>
  );
      }
