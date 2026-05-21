# n8n-node-shopee-afiliado

## Visão geral
`n8n-node-shopee-afiliado` é um **node customizado para o n8n** que permite integrar de forma simples e segura a **API de afiliados da Shopee** aos seus fluxos de automação. Com ele, você pode:

- Consultar **produtos**, **categorias** e **lojas** da Shopee.
- Gerar **links de afiliado** curtos e rastreáveis.
- Recuperar **informações de comissão** e **estatísticas** de campanhas.
- Automatizar **processos de marketing** (ex.: postagem automática em redes sociais, atualização de planilhas, disparo de newsletters).

> **Por que usar?**
> - Elimina a necessidade de escrever código manual para lidar com a autenticação OAuth 2.0 da Shopee.
> - Mantém a lógica de chamada à API centralizada e reutilizável em vários workflows.
> - Compatível com a versão LTS do n8n (v1.x) e pode ser facilmente instalado via npm.

### Principais funcionalidades

| Funcionalidade | Descrição |
|----------------|-----------|
| **Autenticação OAuth 2.0** | Gerencia refresh token e acessos automáticos. |
| **Buscar produtos** | Filtra por ID, palavra‑chave, categoria, preço, etc. |
| **Gerar links de afiliado** | Cria URLs curtos com tracking ID. |
| **Obter comissões** | Consulta métricas de performance da sua conta de afiliado. |
| **Gerenciamento de campanhas** | Cria, atualiza e lista campanhas existentes. |
| **Suporte a Rate‑Limit** | Implementa retry automático com back‑off exponencial. |

## Instalação

```bash
npm install
npm run build
```

## Operações disponíveis

| Operação | Descrição | Principais parâmetros |
|----------|-----------|-----------------------|
| **Get Offers** | Recupera ofertas de produtos com base em `itemId`, `listType` e demais filtros. | `itemId` (único), `listType`, `matchId`, `keyword`, `shopId`, `productCatId`, `sortType`, `page`, `limit`, `isAMSOffer`, `isKeySeller`, `shortlink`, `thumbnail` |
| **Search Products** | Busca produtos por palavra‑chave. | `keyword`, `shopId`, `productCatId`, `sortType`, `page`, `limit`, `isAMSOffer`, `isKeySeller`, `shortlink`, `thumbnail` |

## Propriedades comuns (reutilizadas)

- `keyword` – Busca produtos pelo nome.
- `shopId` – Filtra produtos de uma loja específica.
- `productCatId` – Filtra por categoria Shopee.
- `sortType` – Tipo de ordenação (Relevance, Items Sold, Price Desc/Asc, Commission Desc).
- `page` – Número da página da consulta.
- `limit` – Quantidade máxima de produtos retornados.
- `isAMSOffer` – Filtra ofertas com comissão AMS.
- `isKeySeller` – Filtra ofertas de sellers principais da Shopee.
- `shortlink` – Gera links curtos de afiliado (opcional, pode aumentar o tempo de execução).
- `thumbnail` – Adiciona fórmula `IMAGE` para Google Sheets.

## Parâmetros específicos de **Get Offers**

- `itemId` – Busca um produto específico pelo ID.
- `listType` – Tipo de lista de ofertas (All, Top Performing, Landing Category, Detail Category, Detail Shop).
- `matchId` – Valor de `matchId` correspondente ao `listType` (CategoryId ou ShopId).

## Credenciais

Crie uma credencial chamada **Shopee Affiliate API** com o `partner_id` e `api_key` fornecidos pela Shopee.

## Testes

Testes unitários foram adicionados em `nodes/ShopeeAffiliate/actions/__tests__/` usando Jest. Execute-os com:

```bash
npm test
```

## Observação de desempenho

A opção **Short Link** faz requisições adicionais à API para gerar links curtos e pode aumentar o tempo de execução da operação.

---

Para mais detalhes, consulte a documentação oficial da Shopee Affiliate API.