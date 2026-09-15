import { href } from "../services/site";
export function Brand() {
  return (
    <a className="brand" href={href()} aria-label="Roussenq Motos — início">
      <span className="brand-symbol">
        <img
          src={href("assets/logo-symbol.webp")}
          alt=""
          width="320"
          height="160"
        />
      </span>
      <span className="brand-type">
        ROUSSENQ<small>M O T O S</small>
      </span>
    </a>
  );
}
