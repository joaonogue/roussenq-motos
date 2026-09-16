# Verificação da primeira entrega

Data: 15/09/2026.

## Executado

- TypeScript sem erros e build Vite concluído.
- 6 arquivos HTML pré-renderizados: Home, estoque, 3 motos e 404.
- Build também executado com base `/roussenq-motos/`. 169 referências locais verificadas, todas resolvidas.
- Em build de teste, títulos de cada moto, canonical e imagens Open Graph absolutas correspondem ao registro. O domínio de teste foi removido da entrega final.
- 5 testes automatizados aprovados: filtros combinados, busca sem acentos, marca/status, estado vazio/limpeza e ordenações.
- Navegação real para estoque, filtros de marca/status, busca sem resultado e limpeza conferidos no navegador.
- Painel mobile aberto, filtro de vendidas aplicado e página correspondente aberta.
- Moto vendida mostra consulta de outras opções; não exibe compra normal.
- Galeria: miniaturas, setas, ampliação, zoom, navegação por teclado e Escape conferidos.
- Acesso direto e atualização da URL de moto testados no build estático; a galeria continua interativa após hidratação.
- Nenhum erro de hidratação React observado. O navegador registrou cancelamentos de View Transitions durante navegações rápidas na prévia de desenvolvimento, sem impedir as páginas.
- Verificação responsiva com dimensões de desktop e celular; sem overflow horizontal nas páginas inspecionadas.

## Peso

JavaScript inicial: aproximadamente 239 KB antes de compressão, 75 KB com gzip. Estoque e detalhes carregam em módulos separados. CSS: aproximadamente 30 KB antes de compressão. Todas as fotos demonstrativas, incluindo versões menores, somam aproximadamente 1 MB; a imagem editorial tem cópia independente para não depender da permanência de uma moto no estoque. Fontes WOFF2 locais.

Não foi atribuída nota Lighthouse: o ambiente da prévia não corresponde à hospedagem pública. Não houve envio de mensagens pelo WhatsApp; os links e seu conteúdo foram verificados. Swipe está implementado, mas não foi testado em hardware móvel físico. Aparência final de previews sociais depende da URL publicada e dos caches de cada rede.

## Estado de entrega

Projeto local preparado para GitHub. Sem publicação, domínio ou repositório remoto configurado. O destino do GitHub e os dados/fotos reais do estoque ainda precisam ser fornecidos. O modo de demonstração permanece ligado e não indexável.

## Revisão da versão 2 — 15/09/2026

- Novo build aprovado em raiz e em /roussenq-motos/; 6 páginas e 169 referências locais verificadas.
- Os 5 testes de catálogo passaram novamente.
- Home e estoque conferidos visualmente a 390 px; primeira moto visível na primeira tela do estoque.
- Busca sem resultado e limpeza verificadas; navegação para Sport concluída.
- Segunda imagem distinta, ampliação e fechamento por Escape conferidos.
- Corrigida a barra mobile para aparecer também após saltos grandes de rolagem; estado visível confirmado no navegador.
- Desktop revisado a 1440 px. Sem publicação desta revisão no GitHub Pages.

As medidas de peso da primeira entrega acima são históricas. A versão 2 possui novas imagens conceituais e conserva os assets anteriores. Fotos e dados reais continuam pendentes por decisão do usuário; a apresentação demonstrativa está pronta para revisão.
