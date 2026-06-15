# feat/foundation

**Branch:** `main` (baseline)
**Fase:** 0
**Depende de:** —
**Status:** `done`

## Objetivo
Estabelecer a base funcional do node n8n Shopee Affiliate, incluindo transporte GraphQL, ações básicas (ShortLink, Offers, Search) e ambiente de desenvolvimento Docker.

## Critério de conclusão
```bash
npm run build && npm test
```

## Tarefas
- [x] **00-1** Implementação do transporte GraphQL centralizado.
- [x] **00-2** Implementação da operação Generate Short Link.
- [x] **00-3** Implementação da operação Get Offers / Get Offers Automation.
- [x] **00-4** Implementação da operação Search Products.
- [x] **00-5** Configuração de credenciais Shopee Affiliate API.
- [x] **00-6** Setup de ambiente Docker e scripts de build/gulp.

## Arquivos gerados
```
nodes/ShopeeAffiliate/ShopeeAffiliate.node.ts
nodes/ShopeeAffiliate/transport/graphql.request.ts
nodes/ShopeeAffiliate/actions/*.ts
credentials/ShopeeAffiliateApi.credentials.ts
```

## Skills relevantes
- Builder (n8n node structure)
- Specifier (GraphQL API)
