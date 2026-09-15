import config from "../../data/site.json";
export { config };
export const base = import.meta.env.BASE_URL;
export const href = (path = "") => base + path.replace(/^\//, "");
export const money = (n: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(n);
export const number = (n: number) => new Intl.NumberFormat("pt-BR").format(n);
export const whatsapp = (
  text = "Olá! Gostaria de conversar com a Roussenq Motos.",
) => `https://wa.me/${config.phone}?text=${encodeURIComponent(text)}`;
