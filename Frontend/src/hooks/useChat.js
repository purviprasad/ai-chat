import { useState } from "react";
import { sendMessage} from "../services/api.js";

export const useChat = () =>{
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const send = async (input) =>{
        let aiMessage = "";
        setMessages(prev=>[...prev, {role: "user", content: input}])
        setIsLoading(true);
        try {
            await sendMessage(input, (chunk)=>{
                aiMessage +=chunk;
                setMessages(prev=>{
                    const updated=[...prev];
                    if(updated[updated.length - 1].role === "assistant"){
                        updated[updated.length - 1].content = aiMessage;
                    }else{
                        updated.push({role: "assistant", content: aiMessage})
                    }
                    return updated;
                })
            })
        } finally {
            setIsLoading(false);
        }
    }

    return {messages, send, isLoading};
}