# ROUSSENQ MOTOS

Showroom estático para a Roussenq Motos, de Imaruí (SC). React + Vite + TypeScript. Sem servidor de aplicação, banco, login ou painel administrativo.

## O que esta entrega contém

- Home editorial responsiva, com a identidade preta, branca e verde da marca.
- `/estoque/` com busca, seis filtros combináveis, ordenação e painel mobile.
- `/motos/<slug>/` com página própria, galeria, ampliação, teclado, swipe e compartilhamento.
- Contatos contextualizados no WhatsApp **(48) 98812-1232**.
- HTML pré-renderizado por URL, incluindo títulos e descrições próprios. Refresh funciona porque cada rota corresponde a uma pasta com `index.html`.
- Publicação manual preparada para GitHub Pages, com base path calculado pelo workflow.

**Estoque de demonstração:** os três cadastros possuem dados e preços fictícios e imagens ilustrativas. Não representam ofertas. A sinalização aparece no site inteiro e em cada moto. Nenhuma história, endereço, garantia, financiamento ou avaliação foi inventada.

## Abrir no computador

Instale Node.js 22 ou superior e pnpm 11. Dentro desta pasta:

```sh
pnpm install
pnpm dev
```

Abra o endereço exibido no terminal. Para conferir a versão final estática:

```sh
pnpm build
pnpm preview
```

`dist/` é a pasta pronta para hospedagem. Não abra o HTML com duplo clique: o navegador precisa de um servidor HTTP para carregar os módulos corretamente.

## Onde editar

| Arquivo/pasta | Finalidade |
| --- | --- |
| `data/motos.json` | Todas as informações do estoque |
| `data/site.json` | Telefone, modo demonstrativo e endereço público |
| `public/assets/motos/` | Fotografias organizadas por moto |
| `src/components/` | Marca, cards e galeria |
| `src/pages/` | Estoque e detalhe |
| `src/services/` | Filtros, formatação e links |
| `src/styles.css` | Identidade, layout e animações |
| `scripts/prerender.mjs` | Geração de páginas, sitemap e metadados |

## Como adicionar uma moto

1. Abra `data/motos.json`.
2. Copie um objeto inteiro entre `{` e `}` e cole antes do último `]`. Separe os objetos com vírgula.
3. Troque `id` e `slug` por valores únicos. O slug usa letras minúsculas sem acentos, números e hífens. Exemplo de formato: `honda-cb-500f-2024`.
4. Preencha os dados **reais**. Números ficam sem aspas, ponto de milhar ou símbolo de moeda. `42900` significa R$ 42.900.
5. Escreva a descrição específica da unidade em `descricao`.
6. Coloque as fotos na pasta dessa moto e atualize `imagens`.
7. Use `demo: false` somente para cadastros reais. O modo global continua sinalizando a prévia até todo o estoque demonstrativo ser removido.
8. Rode `pnpm build`. O build verifica slugs duplicados, status e fotos ausentes.

O campo `createdAt` usa `AAAA-MM-DD` e determina a ordenação por mais recentes. `ano` é fabricação; `anoModelo` é o ano modelo. O JSON não aceita comentários nem vírgula após o último item.

## Como alterar um preço

Encontre a moto no JSON e altere apenas `preco`. Por exemplo, de `42900` para `41900`. A formatação em reais aparece automaticamente no site. Salve e gere o build novamente.

## Como alterar a descrição

Edite o texto entre aspas em `descricao`. Não há geração automática de promessas ou características. Se precisar colocar aspas dentro do texto, use `\"`. Em `destaques`, liste apenas fatos confirmados, como `"Manual"`; use `[]` quando não houver destaques.

## Como trocar fotos

Crie uma pasta simples como `public/assets/motos/honda-cb500f-2024/` e coloque `01.webp`, `02.webp`, etc. Use fotos autorizadas da **mesma unidade**, preferencialmente com até 1600 px de largura e abaixo de 350 KB cada.

No JSON, os caminhos não incluem `public/` nem começam com `/`:

```json
"imagens": [
  "assets/motos/honda-cb500f-2024/01.webp",
  "assets/motos/honda-cb500f-2024/02.webp"
]
```

Para cada foto, inclua uma versão de 640 px com sufixo `-640`, como `01-640.webp`. Ela é usada em telas pequenas e miniaturas. As imagens principais e as versões menores já estão preparadas nos exemplos. Preserve o enquadramento ao reduzir. A primeira foto é a capa do catálogo e a imagem de compartilhamento da página.

Na demonstração Sport 01, a galeria apresenta duas imagens conceituais geradas por IA: a vista completa e um detalhe. Elas não documentam uma unidade real. Nas demais, existe uma foto, então as setas ficam desativadas.

## Como marcar como vendida ou reservada

Altere `status` para exatamente um destes valores:

```json
"status": "disponivel"
```

- `disponivel`: contato de interesse para a unidade real.
- `reservada`: selo de reserva e contato para consultar a reserva.
- `vendida`: apresentação marcada como vendida e contato para **outras opções**. O CTA normal de compra desaparece.

As motos demonstrativas usam contato para consultar o estoque real, evitando que alguém solicite uma oferta fictícia.

## Como destacar na Home

Troque `featured` para `true`. Para retirar só do destaque, use `false`. Os exemplos estão compostos como uma dupla editorial, mas o site aceita mais cadastros. Para preservar a direção de arte, mantenha uma seleção curta.

## Como remover uma moto

Remova o objeto inteiro do JSON. Ajuste a vírgula entre os objetos restantes. Gere o build novamente. A página deixa de ser gerada e a URL passa para 404. As fotos podem ser removidas depois de confirmar que nenhuma outra moto utiliza os arquivos.

## GitHub agora; publicação quando decidir

O projeto não foi publicado automaticamente. A rotina de Pages é **manual**, sem gatilho a cada commit.

1. Envie os arquivos desta pasta para o repositório desejado. Não envie `node_modules/`, `dist/`, `.ssr/` ou arquivos `.env`.
2. Para publicar futuramente, entre em **Settings → Pages → Source → GitHub Actions**.
3. Em **Actions**, abra **Publicar no GitHub Pages (manual)** e selecione **Run workflow**.

O workflow obtém automaticamente a origem e a subpasta do Pages. Funciona tanto em `usuario.github.io/` quanto em `usuario.github.io/repositorio/`. As URLs terminam em `/` para servir os arquivos estáticos diretamente. A página `404.html` fornece retorno ao estoque para caminhos desconhecidos.

Para testar outra subpasta manualmente, defina `BASE_PATH=/nome-do-repositorio/` durante **todo** o comando de build; por exemplo no PowerShell:

```powershell
$env:BASE_PATH = '/nome-do-repositorio/'
$env:SITE_URL = 'https://usuario.github.io'
pnpm build
Remove-Item Env:BASE_PATH
Remove-Item Env:SITE_URL
```

## Antes de apresentar o catálogo como real

Substitua/remova os três cadastros demonstrativos e suas imagens ilustrativas. Em `data/site.json`, mude `demo` para `false`. O build impede essa mudança enquanto houver motos com `demo: true`.

Informe `siteUrl` como origem pública HTTPS, **sem a subpasta**, e `basePath` separadamente. O workflow do Pages também fornece esses valores ao build. Enquanto não houver URL pública ou o modo demonstrativo estiver ativo, o site fica com `noindex`, `robots.txt` bloqueado e sitemap vazio. Isso é deliberado.

Os metadados de cada moto já saem no HTML, sem depender de JavaScript do robô social. A imagem usa URL absoluta somente quando a origem pública estiver configurada. WhatsApp e outras redes podem manter cache e decidem como renderizar a prévia. Não há imagem social inventada para a Home: a prévia específica de cada moto usa sua capa real quando fornecida.

## Identidade e conteúdo

O símbolo da moto foi limpo a partir da referência enviada e combinado com tipografia legível. O arquivo da referência foi preservado. Consulte `docs/DIRECAO-DE-ARTE.md` e `docs/CREDITOS.md` para decisões, créditos e limites dos materiais demonstrativos.

## Acessibilidade e desempenho

Há links de salto, foco visível, labels, diálogos nativos com Escape e contenção de foco, estados vazios, gestos de galeria e preferência de movimento reduzido. As fontes WOFF2 são locais. Fotografias usam WebP, tamanhos responsivos e carregamento tardio. A Home prioriza apenas a imagem principal. Efeitos de profundidade são leves e desativados no mobile ou com movimento reduzido.

## Como evoluir para um backend

Preserve o formato dos registros e substitua a origem dos dados em `src/services/` por uma API. A UI de card, galeria e detalhe continua reutilizável. Registros novos exigirão nova geração estática ou uma mudança explícita da estratégia de entrega. Autenticação e autorização devem nascer junto com o painel real; nada disso foi simulado nesta versão.

## Verificações

`pnpm test` verifica combinações dos filtros, busca sem acentos, estados vazios e ordenações. `pnpm build` verifica TypeScript, compila a aplicação e pré-renderiza todas as URLs. Confira também o relatório da entrega em `docs/VALIDACAO.md`.
