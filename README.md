# Roussenq Motos

Site institucional estático da Roussenq Motos, preparado para publicação no Cloudflare Pages.

## Atualizar as motos

1. Otimize cada foto real em WebP ou AVIF e salve em `dist/assets/motos/`.
2. Adicione a moto em `dist/assets/data/motos.json` usando apenas os dados confirmados.
3. Não preencha campos sem informação: o site só exibe campos presentes no arquivo.

Exemplo de uma moto:

```json
{
  "brand": "Honda",
  "model": "CG 160",
  "version": "Titan",
  "year": "2024",
  "km": "8.200 km",
  "cc": "160 cc",
  "price": "R$ 18.900",
  "image": "assets/motos/honda-cg-160.webp",
  "imageAlt": "Honda CG 160 Titan preta vista de três quartos"
}
```

## Antes de publicar no domínio próprio

- Troque o endereço de exemplo em `dist/sitemap.xml` pelo domínio final.
- Atualize as URLs Open Graph em `dist/index.html` quando o domínio for definido.
- Substitua `dist/assets/brand/logo-crop.jpeg` pelo logo oficial isolado em PNG ou SVG quando ele estiver disponível.

O site não utiliza banco de dados, login, checkout ou backend.
