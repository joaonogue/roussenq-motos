import type { Moto } from "../types";
import { href, money, number, whatsapp } from "../services/site";
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
          sizes="(max-width: 539px) 100vw, (max-width: 1100px) 50vw, 370px"
          loading="lazy"
          decoding="async"
          alt={`${moto.modelo}${moto.demo ? " — imagem ilustrativa" : ""}`}
          width="1600"
          height="1067"
        />
        <span className={`status ${moto.status}`}>
          {moto.demo ? `${statusLabel[moto.status]} · exemplo` : statusLabel[moto.status]}
        </span>
        <span className="image-index">
          {String(index + 1).padStart(2, "0")} / ROUSSENQ
        </span>
        <span className="image-cta">Ver detalhes ↗</span>
      </a>
      <div className="moto-info">
        <div>
          <p className="eyebrow">
            {moto.demo ? "Exemplo" : moto.marca} <span>/ {moto.versao}</span>
          </p>
          <h3>
            <a href={href(`motos/${moto.slug}/`)}>{moto.modelo}</a>
          </h3>
          <dl className="card-specs"><div><dt>Ano</dt><dd>{moto.anoModelo}</dd></div><div><dt>Quilometragem</dt><dd>{number(moto.quilometragem)} km</dd></div><div><dt>Motor</dt><dd>{moto.cilindrada} cc</dd></div></dl>
        </div>
        <div className="card-price">
          <small>{moto.demo ? "Valor ilustrativo" : "Valor"}</small>
          <strong>{money(moto.preco)}</strong>
        </div>
        <div className="card-actions"><a className="card-detail" href={href(`motos/${moto.slug}/`)} aria-label={`Ver detalhes de ${moto.modelo}`}>Ver detalhes <span aria-hidden="true">↗</span></a><a className="card-whatsapp" href={whatsapp(moto.demo ? `Olá! Vi o exemplo ${moto.modelo} no catálogo. Quais motos estão disponíveis na Roussenq?` : moto.status === "vendida" ? `Olá! Vi a ${moto.modelo} vendida. Vocês têm outras opções?` : `Olá! Gostaria de saber mais sobre a ${moto.modelo} ${moto.anoModelo}.`)} target="_blank" rel="noopener noreferrer" aria-label={`Conversar com a loja sobre ${moto.modelo}`}>{moto.status === "vendida" ? "Outras opções" : "Conversar"}</a></div>
      </div>
    </article>
  );
}
