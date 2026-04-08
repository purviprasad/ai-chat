import { useChat } from "../hooks/useChat.js";
import { useState } from "react";
export default function ChatWindow() {
    const {messages, send} = useChat();
    const [input, setInput] = useState("");

    return (
        <div>
            <div>
                {messages.map((msg,i)=>{
                    return(
                        <div key={i}>
                            <p>{msg.role}: {msg.content}</p>
                        </div>
                    )
                })}
            </div>

            <input
            type="text"
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            onKeyDown={(e)=>e.key === "Enter" && send(input)}
            />
            <button onClick={()=>send(input)}>Send</button>
        </div>
    )
}