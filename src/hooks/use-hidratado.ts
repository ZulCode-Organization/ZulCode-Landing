"use client";

import { useSyncExternalStore } from "react";

/* Nunca muda depois do primeiro render no cliente, então a inscrição é vazia. */
const assinar = () => () => {};
const noCliente = () => true;
const noServidor = () => false;

/* Diz se o componente já passou da hidratação.

   Serve pra decidir quando é seguro renderizar algo que só existe no cliente
   (o tema resolvido pelo next-themes, por exemplo). Ler `resolvedTheme`
   direto e trocar a árvore quando ele deixa de ser undefined quebra a
   hidratação: o HTML do servidor não tem tema nenhum, mas no primeiro render
   do cliente o next-themes já leu o localStorage — e o React reclama que as
   duas árvores não batem.

   `useSyncExternalStore` resolve porque o React usa `noServidor` também no
   render de hidratação: os dois lados começam iguais (false) e a troca vem
   num segundo render, sem setState dentro de efeito. */
export function useHidratado() {
  return useSyncExternalStore(assinar, noCliente, noServidor);
}
