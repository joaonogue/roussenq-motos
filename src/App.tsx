import { useEffect, useRef, useState } from "react";
import motosData from "../data/motos.json";
import { Brand } from "./components/Brand";
import { MotoCard } from "./components/MotoCard";
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
    ["Roussenq", "#roussenq"],
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
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    if (
      matchMedia("(prefers-reduced-motion: reduce), (max-width: 760px)").matches
    )
      return;
    let frame = 0;
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        hero.current?.style.setProperty(
          "--mx",
          `${(e.clientX / innerWidth - 0.5) * 12}px`,
        );
        hero.current?.style.setProperty(
          "--my",
          `${(e.clientY / innerHeight - 0.5) * 8}px`,
        );
      });
    };
    const el = hero.current;
    el?.addEventListener("mousemove", move);
    return () => {
      el?.removeEventListener("mousemove", move);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <main id="main">
      <section className="hero" ref={hero}>
        <img
          className="hero-photo"
          src={href("assets/editorial/hero-v2.webp")}
          srcSet={`${href("assets/editorial/hero-v2-640.webp")} 640w, ${href("assets/editorial/hero-v2.webp")} 1600w`}
          sizes="100vw"
          alt="Motocicleta esportiva verde e preta — fotografia editorial ilustrativa"
          width="1600"
          height="1067"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-kicker">
          <span>IMARUÍ, SANTA CATARINA</span>
          <span>ROUSSENQ / MOTOCICLETAS</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">SEU PRÓXIMO MOVIMENTO</p>
          <h1>
            Máquinas.
            <br />
            <em>Com presença.</em>
          </h1>
        </div>
        <div className="hero-side">
          <span>ESCOLHA</span>
          <i />
          <span>MOVIMENTO</span>
        </div>
        <div className="hero-bottom">
          <div>
            <p>Escolha com o olhar. Conheça nos detalhes.</p>
            <a className="button primary" href={href("estoque/")}>
              Explorar estoque <span>↗</span>
            </a>
          </div>
          <div className="hero-footnote">
            <span>01 — SPORT</span>
            <p>
              Imagem conceitual · esportiva
            </p>
          </div>
          <a
            className="scroll-cue"
            href="#destaques"
            aria-label="Ver motos em destaque"
          >
            ↓
          </a>
        </div>
      </section>
      <div className="brand-strip">
        <span>UM NOVO OLHAR SOBRE DUAS RODAS.</span>
        <p>
          ROUSSENQ MOTOS <i /> IMARUÍ — SC
        </p>
      </div>
      <section id="destaques" className="featured wrap reveal">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / EM FOCO</p>
            <h2>
              Em destaque<span className="heading-period">.</span>
            </h2>
          </div>
          <a className="text-link" href={href("estoque/")}>
            Ver o catálogo completo ↗
          </a>
        </div>
        <div className="featured-grid">
          {motos
            .filter((m) => m.featured)
            .map((m, i) => (
              <MotoCard key={m.id} moto={m} index={i} />
            ))}
        </div>
      </section>
      <section id="roussenq" className="manifesto reveal">
        <div className="wrap manifesto-inner">
          <div>
            <p className="eyebrow">02 / A NOSSA ASSINATURA</p>
            <div className="location-sign"><span>IMARUÍ</span><small>SANTA CATARINA / BRASIL</small></div>
          </div>
          <div>
            <h2>
              Uma escolha pessoal.<br/><em>Uma conversa de perto.</em>
            </h2>
            <p>
              A Roussenq Motos é de Imaruí, Santa Catarina. Aqui, o catálogo aproxima o primeiro olhar da conversa com a equipe. Veja os detalhes de cada moto e fale diretamente com quem vai atender você.
            </p>
            <a
              className="text-link"
              href={whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Fale com a Roussenq ↗
            </a>
          </div>
        </div>
      </section>
      <section className="experience wrap reveal">
        <p className="eyebrow experience-label">DO CATÁLOGO À CONVERSA</p><div className="steps">
          <article>
            <span>01</span>
            <h3>Explore com calma.</h3>
            <p>
              Veja fotos, informações e detalhes de cada moto em um só lugar.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Pergunte direto.</h3>
            <p>Continue pelo WhatsApp com a moto que chamou a sua atenção.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Combine o próximo passo.</h3>
            <p>
              Consulte a disponibilidade e fale com a equipe sobre uma visita.
            </p>
          </article>
        </div>
      </section>
      <section className="more-stock wrap reveal">
        <div className="section-heading">
          <div>
            <p className="eyebrow">04 / OUTROS CAMINHOS</p>
            <h2>
              Outras perspectivas.
            </h2>
          </div>
          <a className="text-link" href={href("estoque/")}>
            Ver todas as motos ↗
          </a>
        </div>
        {motos
          .filter((m) => !m.featured)
          .slice(0, 1)
          .map((m) => (
            <MotoCard key={m.id} moto={m} index={2} />
          ))}
      </section>
      <section id="contato" className="contact reveal">
        <div className="wrap">
          <p className="eyebrow">ROUSSENQ MOTOS / IMARUÍ — SC</p>
          <h2>
            Vamos falar<br/><em>de motos?</em>
          </h2>
          <a
            className="contact-link"
            href={whatsapp()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Vamos conversar <span>↗</span>
          </a>
          <p className="contact-number">WhatsApp · {config.phoneDisplay}</p>
        </div>
        <span className="contact-word" aria-hidden="true">
          ROUSSENQ
        </span>
      </section>
    </main>
  );
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
      {config.demo && <aside className="preview-note" aria-label="Aviso de demonstração"><span>APRESENTAÇÃO CONCEITUAL</span><p>Imagens ilustrativas e valores fictícios. Não são ofertas de venda.</p></aside>}
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

