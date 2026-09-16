import { useEffect, useRef, useState } from "react";
import { MotoCard } from "../components/MotoCard";
import {
  filterMotos,
  initialFilters,
  type Filters,
} from "../services/catalog.mjs";
import type { Moto } from "../types";
export function Stock({ motos }: { motos: Moto[] }) {
  const [filters, setFilters] = useState<Filters>(initialFilters),
    [sort, setSort] = useState("recent");
  const panel = useRef<HTMLDialogElement>(null);
  const found = filterMotos(motos, filters, sort);
  const count = Object.entries(filters).filter(
    ([key, v]) => key !== "search" && v,
  ).length;
  const set = (key: keyof Filters, value: string) =>
    setFilters((f) => ({ ...f, [key]: value }));
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setFilters({
      ...initialFilters,
      ...Object.fromEntries(
        Object.keys(initialFilters).map((k) => [k, p.get(k) || ""]),
      ),
    });
    setSort(p.get("sort") || "recent");
  }, []);
  const updateUrl = () => {
    const p = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v) p.set(k, v);
    });
    if (sort !== "recent") p.set("sort", sort);
    history.replaceState(
      null,
      "",
      location.pathname + (p.size ? "?" + p.toString() : ""),
    );
  };
  useEffect(() => {
    const t = setTimeout(updateUrl, 150);
    return () => clearTimeout(t);
  }, [filters, sort]);
  const controls = (
    <>
      <label>
        Marca
        <select
          value={filters.brand}
          onChange={(e) => set("brand", e.target.value)}
        >
          <option value="">Todas as marcas</option>
          {[...new Set(motos.map((m) => m.marca))].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </label>
      <label>
        Ano modelo
        <select
          value={filters.year}
          onChange={(e) => set("year", e.target.value)}
        >
          <option value="">Todos os anos</option>
          {[...new Set(motos.map((m) => m.anoModelo))]
            .sort((a, b) => b - a)
            .map((x) => (
              <option key={x}>{x}</option>
            ))}
        </select>
      </label>
      <label>
        Preço máximo
        <select
          value={filters.price}
          onChange={(e) => set("price", e.target.value)}
        >
          <option value="">Sem limite</option>
          {[20000, 40000, 50000, 80000].map((x) => (
            <option value={x} key={x}>
              Até R$ {x.toLocaleString("pt-BR")}
            </option>
          ))}
        </select>
      </label>
      <label>
        Cilindrada máxima
        <select value={filters.cc} onChange={(e) => set("cc", e.target.value)}>
          <option value="">Todas</option>
          {[300, 500, 650, 1000].map((x) => (
            <option value={x} key={x}>
              Até {x} cc
            </option>
          ))}
        </select>
      </label>
      <label>
        Quilometragem máxima
        <select value={filters.km} onChange={(e) => set("km", e.target.value)}>
          <option value="">Sem limite</option>
          {[5000, 10000, 20000, 40000].map((x) => (
            <option value={x} key={x}>
              Até {x.toLocaleString("pt-BR")} km
            </option>
          ))}
        </select>
      </label>
      <label>
        Status
        <select
          value={filters.status}
          onChange={(e) => set("status", e.target.value)}
        >
          <option value="">Todos</option>
          <option value="disponivel">Disponível</option>
          <option value="reservada">Reservada</option>
          <option value="vendida">Vendida</option>
        </select>
      </label>
      <button
        className="text-button"
        onClick={() => setFilters(initialFilters)}
      >
        Limpar filtros ↺
      </button>
    </>
  );
  return (
    <main id="main" className="stock-page wrap">
      <div className="page-heading">
        <p className="eyebrow">ESTOQUE / ROUSSENQ MOTOS</p>
        <h1>
          Catálogo de motos<span className="heading-period">.</span>
        </h1>
      </div>
      <div className="search-row">
        <label className="search">
          <span className="sr-only">Buscar uma moto</span>
          <span aria-hidden="true">⌕</span>
          <input
            placeholder="Buscar uma moto"
            type="search"
            value={filters.search}
            onChange={(e) => set("search", e.target.value)}
          />
        </label>
        <button
          className="button mobile-filter"
          onClick={() => {
            panel.current?.showModal();
            document.body.style.overflow = "hidden";
          }}
        >
          Filtrar {count > 0 ? `(${count})` : ""} ≡
        </button>
        <label className="sort-label">
          Ordenar por
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="recent">Mais recentes</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
            <option value="km">Menor quilometragem</option>
          </select>
        </label>
      </div>
      <div className="stock-layout">
        <aside className="desktop-filters">
          <p className="eyebrow">REFINAR SELEÇÃO</p>
          {controls}
        </aside>
        <section className="stock-results" aria-label="Resultados">
          <p className="results-count" role="status">
            {found.length}{" "}
            {found.length === 1 ? "moto encontrada" : "motos encontradas"}
            {count > 0 && ` · ${count} filtros ativos`}
          </p>
          {found.length ? (
            <div className="stock-grid">
              {found.map((m, i) => (
                <MotoCard key={m.id} moto={m} index={i} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <span>∅</span>
              <h2>Nenhuma moto encontrada.</h2>
              <p>Tente outros critérios para explorar o catálogo.</p>
              <button
                className="button primary"
                onClick={() => setFilters(initialFilters)}
              >
                Limpar filtros ↗
              </button>
            </div>
          )}
        </section>
      </div>
      <dialog
        ref={panel}
        className="filter-panel"
        aria-labelledby="filter-title"
        onClose={() => (document.body.style.overflow = "")}
      >
        <div className="panel-heading">
          <h2 id="filter-title">Sua seleção.</h2>
          <button
            aria-label="Fechar filtros"
            onClick={() => panel.current?.close()}
          >
            ×
          </button>
        </div>
        <div className="filter-fields">{controls}</div>
        <button
          className="button primary"
          onClick={() => panel.current?.close()}
        >
          Ver {found.length} {found.length === 1 ? "resultado" : "resultados"} →
        </button>
      </dialog>
    </main>
  );
}
