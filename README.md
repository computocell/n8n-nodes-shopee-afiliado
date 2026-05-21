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
# 📦 n8n‑node‑shopee‑afiliado

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

### Instalação

```bash
# Instale o node no seu ambiente n8n
npm i n8n-node-shopee-afiliado
```

Depois, reinicie o n8n ou recarregue os nodes para que o novo node apareça na paleta.

### Uso rápido

1. **Adicionar credenciais**
   - No menu **Credentials**, escolha **Shopee Affiliate API**. 
   - Insira `Client ID`, `Client Secret` e o `Redirect URI` configurado na sua aplicação Shopee.

2. **Criar workflow**
   - Arraste o node **Shopee Affiliate** para o canvas.
   - Selecione a operação desejada (ex.: *Get Product*, *Create Affiliate Link*).
   - Preencha os parâmetros (ex.: `product_id`, `campaign_id`).
   - Conecte a saída a outros nodes (HTTP Request, Google Sheets, etc.).

3. **Executar**
   - Salve e execute o workflow. O node retornará os dados da API em formato JSON pronto para ser consumido.

### Configurações avançadas

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `clientId` | string | ID da aplicação Shopee (obrigatório). |
| `clientSecret` | string | Segredo da aplicação Shopee (obrigatório). |
| `refreshToken` | string | Token de atualização para renovação automática. |
| `sandbox` | boolean | Define se as chamadas são feitas ao ambiente de testes. |
| `retryAttempts` | number | Número máximo de tentativas em caso de rate‑limit. |
| `retryDelayMs` | number | Tempo de espera entre tentativas (default 5000 ms). |

### Contribuindo

1. Fork este repositório.
2. Crie uma branch `feature/<nome-da-funcionalidade>`.
3. Implemente o código e adicione/atualize testes.
4. Abra um Pull Request descrevendo a mudança.

> **Boa prática:** siga o padrão de linting já configurado no projeto (`npm run lint`) e garanta que todos os testes passem (`npm test`).

### Licença

Distribuído sob a licença **MIT** – sinta‑se livre para usar, modificar e distribuir.

---

Para mais detalhes, consulte a documentação oficial da Shopee Affiliate API.