import { useEffect, useRef } from "react";

export function useNotificacoes(walletId, aoAtualizar) {
  const callbackRef = useRef(aoAtualizar);
  callbackRef.current = aoAtualizar;

  useEffect(() => {
    if (!walletId) return;

    const token = localStorage.getItem("nexion_token");
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
    const url = `${baseUrl}/api/v1/wallets/${walletId}/stream?token=${encodeURIComponent(token)}`;

    const fonte = new EventSource(url);
    fonte.addEventListener("transacoes", () => callbackRef.current());

    return () => fonte.close();
  }, [walletId]);
}
