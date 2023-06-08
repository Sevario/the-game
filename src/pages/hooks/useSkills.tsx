import { useEffect, useState, useContext, useRef, useCallback } from 'react';
import WebSocketContext from '@context/WebSocketContext';

const useWebSocket = (initialUserId: string | null = null, retryInterval = 5000) => {
  const context = useContext(WebSocketContext);

  if (context) {
    return context;
  }

  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connectWebSocket = () => {
      if (wsRef.current) {
        return;
      }

      const newWs = new WebSocket("wss://sevario.xyz:1337");
      wsRef.current = newWs;

      newWs.addEventListener("open", () => {
        console.log("Connected to the server");
        setConnected(true);
        if (initialUserId) {
          newWs.send(JSON.stringify({ type: 'userId', userId: initialUserId }));
        }
      });

      newWs.addEventListener("message", (event) => {
        console.log(`Received message: ${event.data}`);
        const data = JSON.parse(event.data);
        if (data.type === 'skill') {    
          // refreshData();
          // refreshDataT();
        }
      });

      newWs.addEventListener("close", (event) => {
        console.log("Disconnected from the server");
        setConnected(false);
        wsRef.current = null;
        setTimeout(connectWebSocket, retryInterval);
      });

      newWs.addEventListener("error", (event) => {
        console.error("WebSocket error:", event);
      });

      setWs(newWs);
    };

      connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [retryInterval, initialUserId]);

  const sendUserId = (userId: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'userId', userId }));
    }
  };

  return [ws, connected, sendUserId] as [WebSocket | null, boolean, (userId: string) => void];
};
export default useWebSocket;


const useGetSkill = (url: string, dependencies = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!url) return;

    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();
      setData(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies, data]);

  const refreshData = () => {
    fetchData();
  };

  return { data, isLoading, error, refreshData };
};
export { useGetSkill };

const useGetSkillT = (url: string, dependencies = []) => {
  const [dataT, setData] = useState(null);
  const [isLoadingT, setIsLoading] = useState(true);
  const [errorT, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!url) return;

    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();
      setData(data.woodcutting);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  const refreshDataT = () => {
    fetchData();
  };

  return { dataT, isLoadingT, errorT, refreshDataT };
};
export { useGetSkillT };