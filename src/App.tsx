import { useEffect, useRef, useState } from "react";
import motosData from "../data/motos.json";
import { Brand } from "./components/Brand";
import { HomeCatalog } from "./components/HomeCatalog";
import { config, base, href, whatsapp } from "./services/site";
import type { Moto } from "./types";
export const motos = motosData as Moto[];
function Header({ route }: { route: string }) {
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const cb = () => setScrolled(scrollY > 25);
    cb();
    addEventListener("scroll", cb, { passive: true });
    return () => removeEventListener("scroll", cb);
  }, []);
  const links = [
    ["Início", ""],
    ["Estoque", "estoque/"],
    
    ["Contato", "#contato"],
  ];
  return (
    <>
      <a className="skip-link" href="#main">
        Pular para o conteúdo
      </a>
      <header className={scrolled ? "scrolled" : ""}>
        <Brand />
        <nav aria-label="Navegação principal">
          {links.map(([name, path]) => (
            <a
              key={name}
              href={href(path)}
              aria-current={
                (route === "" && path === "") ||
                (route === "estoque" && path === "estoque/")
                  ? "page"
                  : undefined
              }
            >
              {name}
            </a>
          ))}
        </nav>
        <a
          className="header-contact"
          href={whatsapp()}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp <span>↗</span>
        </a>
        <button
          className="menu-toggle"
          onClick={() => {
            menu.current?.showModal();
            document.body.style.overflow = "hidden";
          }}
          aria-label="Abrir menu"
        >
          ☰
        </button>
      </header>
      <dialog
        className="menu-panel"
        ref={menu}
        aria-label="Menu de navegação"
        onClose={() => (document.body.style.overflow = "")}
      >
        <button
          className="menu-close"
          onClick={() => menu.current?.close()}
          aria-label="Fechar menu"
        >
          ×
        </button>
        <Brand />
        <nav>
          {links.map(([name, path], i) => (
            <a
              key={name}
              href={href(path)}
              onClick={() => menu.current?.close()}
            >
              <small>0{i + 1}</small>
              {name} ↗
            </a>
          ))}
        </nav>
        <a
          className="button primary"
          href={whatsapp()}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp ↗
        </a>
      </dialog>
    </>
  );
}
function Home() {
  return <main id="main" className="catalog-home">
    <section className="storefront-hero">
      <img className="storefront-background" src={href("assets/editorial/fachada-conceito.webp")} srcSet={href("assets/editorial/fachada-conceito-800.webp")+" 800w, "+href("assets/editorial/fachada-conceito.webp")+" 1672w"} sizes="100vw" width="1672" height="941" alt="Montagem ilustrativa da fachada da Roussenq Motos com aplicação da marca no letreiro" fetchPriority="high"/>
      <div className="storefront-gradient"/>
      <div className="storefront-content wrap"><div><p className="eyebrow">Imaruí · Santa Catarina</p><h1>Roussenq Motos</h1><p>Sua próxima moto começa com uma boa conversa.</p><a className="button primary" href="#catalogo">Encontrar minha moto ↓</a><a className="storefront-contact" href={whatsapp()} target="_blank" rel="noopener noreferrer">Conversar pelo WhatsApp ↗</a></div><small>Montagem ilustrativa da fachada com aplicação da marca.</small></div>
    </section>
    <HomeCatalog motos={motos}/>
    <section className="shop-contact wrap" id="contato"><div><h2>Gostou de alguma moto?</h2><p>Fale com a Roussenq para consultar o estoque e combinar uma visita.</p></div><a className="button primary" href={whatsapp()} target="_blank" rel="noopener noreferrer">{config.phoneDisplay} ↗</a></section>
  </main>;
}
export function App({
  path,
  content,
}: {
  path: string;
  content?: React.ReactNode;
}) {
  const route = path.replace(base, "").replace(/^\/+|\/+$/g, "");
  const moto = route.startsWith("motos/")
    ? motos.find((m) => m.slug === route.split("/")[1])
    : undefined;
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    nodes.forEach((n) => {
      n.classList.add("will-reveal");
      observer.observe(n);
    });
    return () => observer.disconnect();
  }, [route]);
  return (
    <>
      <Header route={route} />
      {config.demo && <aside className="preview-note" aria-label="Aviso de demonstração"><span>Prévia do catálogo</span><p>Motos, valores e disponibilidade ilustrativos.</p></aside>}
      {route === "" ? (
        <Home />
      ) : route === "estoque" || moto ? (
        content
      ) : (
        <main id="main" className="not-found wrap">
          <p className="eyebrow">404 / FORA DA ROTA</p>
          <h1>
            Vamos voltar
            <br />
            ao caminho.
          </h1>
          <p>Esta página não foi encontrada.</p>
          <a className="button primary" href={href("estoque/")}>
            Explorar estoque ↗
          </a>
        </main>
      )}
      <footer>
        <Brand />
        <p>
          Imaruí · Santa Catarina
          <br />
          <span>Motocicletas. Contato direto.</span>
        </p>
        <a href={whatsapp()} target="_blank" rel="noopener noreferrer">
          WhatsApp ↗
        </a>
        <small>© {new Date().getFullYear()} ROUSSENQ MOTOS</small>
      </footer>
    </>
  );
}

