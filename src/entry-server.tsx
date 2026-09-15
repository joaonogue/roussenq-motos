import { renderToString } from "react-dom/server";
import { App, motos } from "./App";
import { Stock } from "./pages/Stock";
import { Detail } from "./pages/Detail";
import { base } from "./services/site";
export function render(path: string) {
  const route = path.replace(base, "").replace(/^\/+|\/+$/g, "");
  const moto = motos.find((m) => "motos/" + m.slug === route);
  return renderToString(
    <App
      path={path}
      content={
        route === "estoque" ? (
          <Stock motos={motos} />
        ) : moto ? (
          <Detail moto={moto} motos={motos} />
        ) : undefined
      }
    />,
  );
}
