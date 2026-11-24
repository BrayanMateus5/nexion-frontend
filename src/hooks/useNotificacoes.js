import { useEffect, useEffectEvent } from "react";

export function useNotificacoes(walletId, aoAtualizar) {
  const onAtualizar = useEffectEvent(aoAtualizar);

  useEffect(() => {
    if (!walletId) return;

    const token = localStorage.getItem("nexion_token");
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
    const url = `${baseUrl}/api/v1/wallets/${walletId}/stream?token=${encodeURIComponent(token)}`;

    const fonte = new EventSource(url);
    fonte.addEventListener("transacoes", () => onAtualizar());

    return () => fonte.close();
  }, [walletId]);
}
