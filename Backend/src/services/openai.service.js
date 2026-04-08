import openai from "../config/openai.config.js";

export const streamChatCompletion = async (messages, res) => {
    const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{role: "user", content: messages}],
        stream: true,
    }) //Stream response from OpenAI

    for await (const chunk of stream) {
        const token = chunk.choices[0]?.delta?.content || "";
        res.write(token); //Stream to frontend
    }

    res.end(); //End the stream
}