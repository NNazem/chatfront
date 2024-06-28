import { useState, useEffect } from "react";
import { findLastMessage } from "../api/websocket";
import { useQuery } from "@tanstack/react-query";

const useLastMessage = (nickName1, nickName2) => {
  const [lastMessage, setLastMessage] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["lastMessage", nickName1, nickName2],
    queryFn: () => findLastMessage(nickName1, nickName2),
    enabled: !!nickName1 && !!nickName2, // Ensure the query runs only when both nicknames are available
    onSuccess: (data) => {
      setLastMessage(data.content); // Set the message on fetch success
    },
  });

  useEffect(() => {
    if (data) {
      setLastMessage(data.content);
    }
  }, [data]);

  return { lastMessage, isLoading, refetch, setLastMessage };
};

export default useLastMessage;
