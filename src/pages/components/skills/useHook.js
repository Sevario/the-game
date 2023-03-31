import React, { useEffect, useState } from "react";

const useHook = (argument1) => {
    // const [ws, setWs] = useState(null);

    // useEffect(() => {
        // handleConnect();
        // }, []);
    
  
        const websocketUrl = "wss://sevario.xyz:1337";
        const newWs = new WebSocket(websocketUrl);
    
        newWs.addEventListener("open", () => {
          console.log("Connected to the server");
        });
    
        newWs.addEventListener("message", (event) => {
          console.log(`Received message: ${event.data}`);
        });
    
        newWs.addEventListener("close", () => {
          console.log("Disconnected from the server");
        });
    
        newWs.addEventListener("error", (event) => {
          console.error("WebSocket error:", event);
        });
    
        // setWs(newWs);
      

    //   return { ws, handleConnect };
}

export default useHook;