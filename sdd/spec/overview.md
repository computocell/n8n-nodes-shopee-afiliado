# Overview — n8n-node-shopee-afiliado

Este projeto é um pacote de nodes customizados para a plataforma n8n, focado em automatizar interações com a API de Afiliados da Shopee. Ele permite que usuários do n8n integrem fluxos de marketing, busca de produtos e gestão de links de afiliados de forma nativa.

## Índice
- `stack.md` — tecnologias
- `modules.md` — componentes
- `flows.md` — fluxos principais
- `decisions.md` — decisões de design

---

## Arquitetura (C4 Model)

### Nível 1: Contexto
```mermaid
graph TB
  User((Usuário n8n)) --> N8N[Plataforma n8n]
  N8N --> ShopeeNode[n8n-node-shopee-afiliado]
  ShopeeNode --> ShopeeAPI[API Shopee Affiliate]
```

### Nível 2: Containers
```mermaid
graph LR
  subgraph n8n_Instance [Instância n8n]
    Workflow[Workflow Engine] --> NodeUI[Node UI Config]
    NodeUI --> NodeLogic[Node Logic / Actions]
  end
  NodeLogic --> GraphQL[GraphQL Transport]
  GraphQL --> ShopeeAPI((Shopee GraphQL API))
```
