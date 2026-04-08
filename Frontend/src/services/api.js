export const sendMessage = async (message, onChunk)=>{
    const response = await fetch("http://localhost:5001/api/chat",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({message})
    })
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
        const {done, value} = await reader.read();
        if(done) break;
        const chunk = decoder.decode(value);
        onChunk(chunk);
    }
    reader.cancel();
}