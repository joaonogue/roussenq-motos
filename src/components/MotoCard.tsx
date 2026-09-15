import type { Moto } from "../types";
import { href, money, number } from "../services/site";
export const statusLabel: Record<string, string> = {
  disponivel: "Disponível",
  reservada: "Reservada",
  vendida: "Vendida",
};
export function MotoCard({ moto, index = 0 }: { moto: Moto; index?: number }) {
  return (
    <article
      className={`moto-card ${moto.status === "vendida" ? "is-sold" : ""}`}
    >
      <a
        href={href(`motos/${moto.slug}/`)}
        className="moto-image"
        aria-label={`Ver ${moto.modelo}`}
      >
        <img
          src={href(moto.imagens[0])}
          srcSet={`${href(moto.imagens[0].replace(".webp", "-640.webp"))} 640w, ${href(moto.imagens[0])} 1600w`}
          sizes="(max-width: 760px) 100vw, 60vw"
          loading="lazy"
          decoding="async"
          alt={`${moto.modelo}${moto.demo ? " — fotografia ilustrativa" : ""}`}
          width="1600"
          height="1067"
        />
        <span className={`status ${moto.status}`}>
          {statusLabel[moto.status]}
        </span>
        <span className="image-index">
          {String(index + 1).padStart(2, "0")} / ROUSSENQ
        </span>
        <span className="image-cta">Explorar moto ↗</span>
      </a>
      <div className="moto-info">
        <div>
          <p className="eyebrow">
            {moto.marca} <span>/ {moto.versao}</span>
          </p>
          <h3>
            <a href={href(`motos/${moto.slug}/`)}>{moto.modelo}</a>
          </h3>
          <p className="spec-line">
            {moto.anoModelo} <i /> {number(moto.quilometragem)} km <i />{" "}
            {moto.cilindrada} cc
          </p>
        </div>
        <div className="card-price">
          <small>{moto.demo ? "Preço demonstrativo" : "Valor"}</small>
          <strong>{money(moto.preco)}</strong>
        </div>
      </div>
      {moto.demo && (
        <p className="demo-caption">
          Exemplo de catálogo · dados fictícios · foto ilustrativa
        </p>
      )}
    </article>
  );
}
