import { useRef, useState, useEffect } from "react";
import { href } from "../services/site";
import type { Moto } from "../types";
export function Gallery({ moto }: { moto: Moto }) {
  const [active, setActive] = useState(0),
    [zoom, setZoom] = useState(false),
    [loaded, setLoaded] = useState(false),
    [failed, setFailed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null),
    mainImage = useRef<HTMLImageElement>(null),
    start = useRef<number | null>(null),
    opener = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (mainImage.current?.complete && mainImage.current.naturalWidth > 0) setLoaded(true);
  }, [active]);
  const next = (n: number) => {
    setLoaded(false);
    setFailed(false);
    setActive((v) => (v + n + moto.imagens.length) % moto.imagens.length);
    setZoom(false);
  };
  const open = () => {
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
  };
  const close = () => dialog.current?.close();
  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );
  const photo = (full = false) => failed ? (
    <span className="photo-error" role="status">Fotografia indisponível. Tente outra imagem ou consulte a equipe.</span>
  ) : (
    <img
      ref={full ? undefined : mainImage}
      className={`${loaded ? "loaded" : ""} ${full && zoom ? "zoomed" : ""}`}
      src={href(moto.imagens[active])}
      alt={`${moto.modelo} — foto ${active + 1}${moto.demo ? " ilustrativa" : ""}`}
      width="1600"
      height="1067"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      draggable="false"
    />
  );
  const touch = {
    onTouchStart: (e: React.TouchEvent) => {
      start.current = e.touches[0].clientX;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (start.current !== null) {
        const delta = e.changedTouches[0].clientX - start.current;
        if (Math.abs(delta) > 45) next(delta < 0 ? 1 : -1);
      }
      start.current = null;
    },
  };
  return (
    <section className="gallery" aria-label="Galeria de fotos">
      <div className="gallery-main" {...touch}>
        <button
          ref={opener}
          className="photo-open"
          style={{backgroundImage:`url(${href(moto.imagens[active].replace('.webp','-640.webp'))})`}}
          onClick={open}
          disabled={failed}
          aria-label="Ampliar foto em tela cheia"
        >
          {photo()}
          <span>↗ Ampliar fotografia</span>
        </button>
        <div className="gallery-controls">
          <button
            onClick={() => next(-1)}
            aria-label="Foto anterior"
            disabled={moto.imagens.length < 2}
          >
            ←
          </button>
          <span aria-live="polite">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(moto.imagens.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => next(1)}
            aria-label="Próxima foto"
            disabled={moto.imagens.length < 2}
          >
            →
          </button>
        </div>
      </div>
      <div className="thumbnails">
        {moto.imagens.map((img, i) => (
          <button
            key={img}
            aria-label={`Ver foto ${i + 1}`}
            aria-pressed={i === active}
            onClick={() => {
              setActive(i);
              setFailed(false);
              setLoaded(false);
              setZoom(false);
            }}
          >
            <img
              src={href(img.replace(".webp", "-640.webp"))}
              alt=""
              width="100"
              height="70"
              loading="lazy"
            />
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={`Fotografias de ${moto.modelo}`}
        onClose={() => {
          document.body.style.overflow = "";
          setZoom(false);
          opener.current?.focus();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") next(1);
          if (e.key === "ArrowLeft") next(-1);
        }}
      >
        <div className="lightbox-top">
          <span>
            {moto.modelo} / {active + 1}
          </span>
          <button onClick={() => setZoom(!zoom)} aria-pressed={zoom}>
            {zoom ? "Reduzir −" : "Zoom +"}
          </button>
          <button onClick={close} aria-label="Fechar galeria">
            Fechar ×
          </button>
        </div>
        <div className="lightbox-photo" {...touch}>
          {photo(true)}
        </div>
        <div className="lightbox-controls">
          <button onClick={() => next(-1)} disabled={moto.imagens.length < 2}>
            ← Anterior
          </button>
          <button onClick={() => next(1)} disabled={moto.imagens.length < 2}>
            Próxima →
          </button>
        </div>
      </dialog>
    </section>
  );
}
