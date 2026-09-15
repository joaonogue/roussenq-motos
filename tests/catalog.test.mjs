import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { filterMotos, initialFilters } from "../src/services/catalog.mjs";
const motos = JSON.parse(
  fs.readFileSync(new URL("../data/motos.json", import.meta.url)),
);
test("filtros combinados respeitam todos os limites", () => {
  const result = filterMotos(motos, {
    ...initialFilters,
    year: "2024",
    price: "45000",
    cc: "500",
    km: "5000",
    status: "disponivel",
  });
  assert.deepEqual(
    result.map((m) => m.id),
    ["demo-01"],
  );
});
test("busca ignora caixa e acentos", () =>
  assert.equal(
    filterMotos(motos, { ...initialFilters, search: "DEMONSTRACAO" }).length,
    2,
  ));
test("marca e status filtram corretamente", () =>
  assert.deepEqual(
    filterMotos(motos, {
      ...initialFilters,
      brand: "Exemplo",
      status: "reservada",
    }).map((m) => m.id),
    ["demo-02"],
  ));
test("estado vazio e limpeza", () => {
  assert.equal(filterMotos(motos, { ...initialFilters, price: "1" }).length, 0);
  assert.equal(filterMotos(motos, initialFilters).length, motos.length);
});
test("todas as ordenações", () => {
  for (const [sort, field, direction] of [
    ["price-asc", "preco", 1],
    ["price-desc", "preco", -1],
    ["km", "quilometragem", 1],
  ]) {
    const values = filterMotos(motos, initialFilters, sort).map(
      (m) => m[field],
    );
    for (let i = 1; i < values.length; i++)
      assert.ok((values[i] - values[i - 1]) * direction >= 0);
  }
  assert.equal(filterMotos(motos, initialFilters)[0].id, "demo-01");
});
