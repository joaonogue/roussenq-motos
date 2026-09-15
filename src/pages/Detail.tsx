import { useState } from "react";
import type { Moto } from "../types";
import { Gallery } from "../components/Gallery";
import { MotoCard, statusLabel } from "../components/MotoCard";
import { href, money, number, whatsapp } from "../services/site";
export function Detail({ moto, motos }: { moto: Moto; motos: Moto[] }) {
  const [shareStatus, setShareStatus] = useState(""),
    [shareFallback, setShareFallback] = useState(false);
  const sold = moto.status === "vendida";
  const message = moto.demo
    ? `Olá! Vi a apresentação demonstrativa da ${moto.modelo} ${moto.anoModelo} no site da Roussenq Motos. Quais motos estão disponíveis no estoque real?`
    : sold
      ? `Olá! Vi a ${moto.marca} ${moto.modelo} ${moto.anoModelo}, marcada como vendida. Vocês têm outras opções semelhantes?`
      : `Olá! Vi a ${moto.marca} ${moto.modelo} ${moto.anoModelo} no site da Roussenq Motos e gostaria de ${moto.status === "reservada" ? "consultar a reserva" : "mais informações"}.`;
  const cta = sold
    ? "Consultar outras opções"
    : moto.demo
      ? "Consultar estoque real"
      : moto.status === "reservada"
        ? "Consultar reserva"
        : "Tenho interesse";
  const share = async () => {
    const data = {
      title: `${moto.modelo} ${moto.anoModelo} | Roussenq Motos`,
      text: `${moto.demo ? "Exemplo de catálogo: " : ""}${moto.modelo} ${moto.anoModelo} — Roussenq Motos`,
      url: location.href,
    };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        setShareFallback(true);
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(location.href);
          setShareStatus("Link copiado.");
        }
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        setShareFallback(true);
        setShareStatus("Compartilhe pelo WhatsApp abaixo.");
      }
    }
  };
  const specs = [
    ["Marca", moto.marca],
    ["Modelo", moto.modelo],
    ["Versão", moto.versao],
    ["Ano / modelo", `${moto.ano} / ${moto.anoModelo}`],
    ["Quilometragem", `${number(moto.quilometragem)} km`],
    ["Cilindrada", `${moto.cilindrada} cc`],
    ["Cor", moto.cor],
    ["Combustível", moto.combustivel],
    ["Câmbio", moto.cambio],
    ["Condição", moto.condicao],
    ["Status", statusLabel[moto.status]],
  ].filter(([, v]) => v);
  return (
    <main id="main" className="detail-page">
      <div className="wrap">
        <a className="back-link" href={href("estoque/")}>
          ← Voltar ao estoque
        </a>
        <div className="detail-title">
          <div>
            <p className="eyebrow">
              {moto.marca} / {moto.versao}
            </p>
            <h1>
              {moto.modelo}
              <span>{moto.anoModelo}</span>
            </h1>
          </div>
          <span className={`status ${moto.status}`}>
            {statusLabel[moto.status]}
          </span>
        </div>
        {moto.demo && (
          <p className="detail-demo">
            UNIDADE DEMONSTRATIVA — dados e preço fictícios. Fotografias
            ilustrativas; não é uma oferta comercial.
          </p>
        )}
        <Gallery moto={moto} />
        <div className="detail-overview">
          <div className="detail-key-specs">
            <div>
              <small>Ano modelo</small>
              <strong>{moto.anoModelo}</strong>
            </div>
            <div>
              <small>Quilometragem</small>
              <strong>
                {number(moto.quilometragem)} <span>km</span>
              </strong>
            </div>
            <div>
              <small>Cilindrada</small>
              <strong>
                {moto.cilindrada} <span>cc</span>
              </strong>
            </div>
          </div>
          <div className="detail-price">
            <small>{moto.demo ? "Preço demonstrativo" : "Valor da moto"}</small>
            <strong>{money(moto.preco)}</strong>
            <a
              className={`button ${sold ? "outline" : "primary"}`}
              href={whatsapp(message)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cta} ↗
            </a>
            <button className="share-button" onClick={share}>
              Compartilhar moto ↗
            </button>
            <span role="status">{shareStatus}</span>
            {shareFallback && (
              <a
                className="text-link"
                href={`https://wa.me/?text=${encodeURIComponent(`${moto.modelo} — ${typeof location !== "undefined" ? location.href : ""}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enviar pelo WhatsApp
              </a>
            )}
          </div>
        </div>
        <div className="detail-body">
          <section>
            <p className="eyebrow">01 / EM DETALHES</p>
            <h2>Conheça a máquina.</h2>
            <p className="description">{moto.descricao}</p>
            {moto.destaques.length > 0 && (
              <ul className="highlights">
                {moto.destaques.map((d) => (
                  <li key={d}>
                    <span>↗</span>
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <p className="eyebrow">02 / FICHA TÉCNICA</p>
            <dl className="spec-table">
              {specs.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
        <section className="related">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CONTINUE EXPLORANDO</p>
              <h2>Outras máquinas.</h2>
            </div>
            <a className="text-link" href={href("estoque/")}>
              Ver estoque completo ↗
            </a>
          </div>
          <div className="related-grid">
            {motos
              .filter((m) => m.id !== moto.id)
              .slice(0, 2)
              .map((m, i) => (
                <MotoCard key={m.id} moto={m} index={i} />
              ))}
          </div>
        </section>
      </div>
      <div className="mobile-interest">
        <div>
          <small>{moto.demo ? "Valor demonstrativo" : "Valor"}</small>
          <strong>{money(moto.preco)}</strong>
        </div>
        <a
          className={`button ${sold ? "outline" : "primary"}`}
          href={whatsapp(message)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {cta} ↗
        </a>
      </div>
    </main>
  );
}
