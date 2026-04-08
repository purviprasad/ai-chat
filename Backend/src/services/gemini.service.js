import {genAI} from "../config/gemini.config.js";

export const streamChatCompletion = async (message, res)=>{
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
    })
    const result = await model.generateContentStream({contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],});
    for await (const chunk of result.stream){
        const text = chunk.text();
        res.write(text);
    }

    res.end();

}