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
          src={href("assets/editorial/hero.webp")}
          srcSet={`${href("assets/editorial/hero-640.webp")} 640w, ${href("assets/editorial/hero.webp")} 1600w`}
          sizes="100vw"
          alt="Motocicleta esportiva verde e preta — fotografia editorial ilustrativa"
          width="1600"
          height="1067"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-kicker">
          <span>IMARUÍ, SANTA CATARINA</span>
          <span>INDEPENDENTE. POR ESCOLHA.</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">ROUSSENQ MOTOS</p>
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
            <p>A próxima escolha tem a sua assinatura.</p>
            <a className="button primary" href={href("estoque/")}>
              Explorar estoque <span>↗</span>
            </a>
          </div>
          <div className="hero-footnote">
            <span>01 — SPORT</span>
            <p>
              Fotografia ilustrativa
              <br />
              Explore nossa apresentação.
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
        <span>SELEÇÃO. PRESENÇA. MOVIMENTO.</span>
        <p>
          ROUSSENQ MOTOS <i /> IMARUÍ — SC
        </p>
      </div>
      <section id="destaques" className="featured wrap reveal">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / EM FOCO</p>
            <h2>
              Algumas máquinas
              <br />
              pedem um <em>segundo olhar.</em>
            </h2>
          </div>
          <a className="text-link" href={href("estoque/")}>
            Explorar todo o estoque ↗
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
            <span className="manifesto-monogram" aria-hidden="true">
              R.
            </span>
          </div>
          <div>
            <h2>
              A moto chama
              <br />a atenção.
              <br />
              <em>
                A conversa
                <br />
                faz a diferença.
              </em>
            </h2>
            <p>
              Somos a Roussenq Motos, uma revenda de motocicletas em Imaruí,
              Santa Catarina. Um contato direto para falar de motos, entender
              sua escolha e conhecer o que está no estoque.
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
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / DO PRIMEIRO OLHAR À CONVERSA</p>
            <h2>
              Menos distância.
              <br />
              <em>Mais contato.</em>
            </h2>
          </div>
        </div>
        <div className="steps">
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
              O seu estilo.
              <br />
              <em>A sua máquina.</em>
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
            Uma boa escolha
            <br />
            começa com uma
            <br />
            <em>boa conversa.</em>
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
      {config.demo && (
        <div className="demo-banner">
          PRÉVIA DEMONSTRATIVA{" "}
          <span>Catálogo com dados fictícios e fotos ilustrativas.</span>
        </div>
      )}
    </>
  );
}

