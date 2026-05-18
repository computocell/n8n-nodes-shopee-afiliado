# n8n-nodes-shopee-affiliate

Node da **Shopee Affiliate API** para n8n. Permite buscar ofertas de produtos e buscar produtos por palavra‑chave.

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
Os parâmetros abaixo são compartilhados por ambas as operações e são definidos em `common.properties.ts`:

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
- `listType` – Tipo de lista de ofertas (All, Top Performing, Landing Category, Detail Category, Detail Shop). Itens marcados como **To Be Removed** foram omitidos.
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