export function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {  /*formata o valor pro BR*/
    style: "currency",                    /*estilo de moeda*/
    currency: "BRL",                       /*moeda brasileira*/
  });
}