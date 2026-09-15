import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { App, motos } from "./App";
import { base } from "./services/site";
import "./styles.css";
async function start() {
  const root = document.getElementById("root")!;
  const route = location.pathname.replace(base, "").replace(/^\/+|\/+$/g, "");
  let content: React.ReactNode;
  if (route === "estoque") {
    const { Stock } = await import("./pages/Stock");
    content = <Stock motos={motos} />;
  } else if (route.startsWith("motos/")) {
    const moto = motos.find((m) => m.slug === route.split("/")[1]);
    if (moto) {
      const { Detail } = await import("./pages/Detail");
      content = <Detail moto={moto} motos={motos} />;
    }
  }
  const app = (
    <React.StrictMode>
      <App path={location.pathname} content={content} />
    </React.StrictMode>
  );
  if (root.querySelector("header")) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
start().catch(() => {
  const root = document.getElementById("root");
  if (root && !root.querySelector("header"))
    root.innerHTML =
      '<main style="padding:3rem"><h1>Não foi possível carregar a página.</h1><p>Verifique sua conexão e recarregue.</p><a href="' +
      base +
      '">Voltar ao início</a></main>';
});
