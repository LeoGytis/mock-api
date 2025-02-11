import { useEffect, useState } from "react";

const useWebSocket = () => {
  const [playerBalance, setPlayerBalance] = useState<number | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3003");

    socket.onopen = () => {
      console.log("WebSocket connected");

      const playerId = localStorage.getItem("playerId");
      if (playerId) {
        socket.send(JSON.stringify({ type: "register_player", id: playerId }));

        fetchBalanceUpdate(playerId);
      }
    };

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === "balance_update") {
        setPlayerBalance(data.balance);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const fetchBalanceUpdate = async (playerId: string | null) => {
    if (!playerId) return;
    try {
      await fetch(`http://localhost:3000/initialize-update?id=${playerId}`);
    } catch (error) {
      console.error("Error initializing balance update:", error);
    }
  };

  return playerBalance;
};

export default useWebSocket;
