import { useState } from "react";
import type { Moto } from "../types";
import { MotoCard } from "./MotoCard";
import { filterMotos, initialFilters } from "../services/catalog.mjs";
import { href, whatsapp } from "../services/site";
export function HomeCatalog({ motos }: { motos: Moto[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("recent");
  const found = filterMotos(motos, { ...initialFilters, search, status }, sort);
  return <section className="home-catalog wrap" id="catalogo" aria-labelledby="catalog-title">
    <div className="section-heading"><div><p className="eyebrow">ENCONTRE A SUA PRÓXIMA MOTO</p><h2 id="catalog-title">Nosso catálogo</h2></div><a className="text-link" href={href("estoque/")}>Mais filtros <span aria-hidden="true">↗</span></a></div>
    <div className="catalog-toolbar"><label className="catalog-search"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><span className="sr-only">Buscar no catálogo</span><input type="search" placeholder="Busque por modelo ou marca" value={search} onChange={e=>setSearch(e.target.value)}/></label><label className="catalog-sort"><span>Ordenar</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="recent">Mais recentes</option><option value="price-asc">Menor preço</option><option value="price-desc">Maior preço</option><option value="km">Menor quilometragem</option></select></label></div>
    <div className="catalog-selection"><div className="status-filters" role="group" aria-label="Filtrar por disponibilidade">{[["","Todas"],["disponivel","Disponíveis"],["reservada","Reservadas"],["vendida","Vendidas"]].map(([value,label])=><button key={value} aria-pressed={status===value} onClick={()=>setStatus(value)}>{label}</button>)}</div><p role="status" aria-live="polite">{found.length} {found.length===1?"moto":"motos"}{(search||status)&&<button className="clear-selection" onClick={()=>{setSearch("");setStatus("")}}>Limpar busca</button>}</p></div>
    {found.length ? <div className="catalog-grid">{found.map((m,i)=><MotoCard key={m.id} moto={m} index={i}/>)}</div>:<div className="empty"><h3>Nenhuma moto com essa seleção.</h3><p>Tente outro modelo ou consulte a loja pelo WhatsApp.</p><button className="button primary" onClick={()=>{setSearch("");setStatus("")}}>Ver todas as motos</button><a className="text-link" href={whatsapp()} target="_blank" rel="noopener noreferrer">Consultar a loja ↗</a></div>}
  </section>;
}
