export const initialFilters = {
  search: "",
  brand: "",
  year: "",
  price: "",
  cc: "",
  km: "",
  status: "",
};
export function filterMotos(motos, filters, sort = "recent") {
  const norm = (s) =>
    String(s)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const found = motos.filter(
    (m) =>
      (!filters.search ||
        norm(`${m.marca} ${m.modelo} ${m.versao}`).includes(
          norm(filters.search),
        )) &&
      (!filters.brand || m.marca === filters.brand) &&
      (!filters.year || m.anoModelo === Number(filters.year)) &&
      (!filters.price || m.preco <= Number(filters.price)) &&
      (!filters.cc || m.cilindrada <= Number(filters.cc)) &&
      (!filters.km || m.quilometragem <= Number(filters.km)) &&
      (!filters.status || m.status === filters.status),
  );
  return [...found].sort((a, b) =>
    sort === "price-asc"
      ? a.preco - b.preco
      : sort === "price-desc"
        ? b.preco - a.preco
        : sort === "km"
          ? a.quilometragem - b.quilometragem
          : b.createdAt.localeCompare(a.createdAt),
  );
}
