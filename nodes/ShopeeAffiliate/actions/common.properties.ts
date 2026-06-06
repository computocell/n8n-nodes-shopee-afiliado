import { INodeProperties } from 'n8n-workflow';

export const commonProductProperties: INodeProperties[] = [
  /*
   * Keyword
   */
  {
    displayName: "Keyword",
    name: "keyword",
    type: "string",
    default: "",
    description: "Busca produtos pelo nome",
    displayOptions: {
      show: {
        operation: ["getOffers", "getOffersAutomation", "searchProducts"],
      },
    },
  },

  /*
   * Item ID
   */
  {
    displayName: "Item ID",
    name: "itemId",
    type: "number",
    default: 0,
    description: "Busca um produto específico pelo ID",
    displayOptions: {
      show: {
        operation: ["getOffers", "getOffersAutomation"],
      },
    },
  },

  /*
   * List Type
   */
  {
    displayName: "List Type",
    name: "listType",
    type: "options",
    default: 0,
    description: "Type of product offer list",
    displayOptions: {
      show: {
        operation: ["getOffers", "getOffersAutomation"],
      },
    },
    options: [
      {
        name: "All",
        value: 0,
        description: "Recommendation product list, not available to sort",
      },
      {
        name: "Top Performing",
        value: 2,
        description: "Top performing product offer list, not available to sort",
      },
      {
        name: "Landing Category",
        value: 3,
        description:
          "Product offer list of recommendation category in landing page, not available to sort",
      },
      {
        name: "Detail Category",
        value: 4,
        description: "Product offer list of specific category in detail page",
      },
      {
        name: "Detail Shop",
        value: 5,
        description: "Product offer list of specific shop in detail page",
      },
    ],
  },

  /*
   * Match ID
   */
  {
    displayName: "Match ID",
    name: "matchId",
    type: "number",
    default: 0,
    description:
      "The matchid for specific listType. CategoryId for LANDING_CATEGORY and DETAIL_CATEGORY; ShopId for DETAIL_SHOP",
    displayOptions: {
      show: {
        operation: ["getOffers", "getOffersAutomation"],
      },
    },
  },

  /*
   * Shop ID
   */
  {
    displayName: "Shop ID",
    name: "shopId",
    type: "number",
    default: 0,
    description: "Filtra produtos de uma loja específica",
    displayOptions: {
      show: {
        operation: ["getOffers", "getOffersAutomation", "searchProducts"],
      },
    },
  },

  /*
   * Category ID
   */
  {
    displayName: "Category ID",
    name: "productCatId",
    type: "number",
    default: 0,
    description: "Filtra produtos por categoria Shopee",
    displayOptions: {
      show: {
        operation: ["getOffers", "getOffersAutomation", "searchProducts"],
      },
    },
  },

  /*
   * Sort Type
   */
  {
    displayName: "Sort Type",
    name: "sortType",
    type: "options",
    default: 1,
    description: "Define a ordenação dos produtos retornados",
    displayOptions: {
      show: {
        operation: ["getOffers", "getOffersAutomation", "searchProducts"],
      },
    },
    options: [
      {
        name: "Relevance",
        value: 1,
        description: "Ordena por relevância da keyword",
      },
      {
        name: "Items Sold",
        value: 2,
        description: "Produtos mais vendidos primeiro",
      },
      {
        name: "Price Desc",
        value: 3,
        description: "Maior preço primeiro",
      },
      {
        name: "Price Asc",
        value: 4,
        description: "Menor preço primeiro",
      },
      {
        name: "Commission Desc",
        value: 5,
        description: "Maior comissão primeiro",
      },
    ],
  },

  /*
   * Page
   */
  {
    displayName: "Page",
    name: "page",
    type: "number",
    default: 1,
    description: "Número da página da consulta",
    displayOptions: {
      show: {
        operation: ["getOffers", "searchProducts"],
      },
    },
  },

  /*
   * Limit
   */
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 10,
    description: "Quantidade máxima de produtos retornados",
    displayOptions: {
      show: {
        operation: ["getOffers", "getOffersAutomation", "searchProducts"],
      },
    },
  },

  /*
   * AMS Offer
   */
  {
    displayName: "AMS Offer",
    name: "isAMSOffer",
    type: "boolean",
    default: false,
    description:
      "Filter by type of offer \n TRUE = Filter for offers that have seller (AMS) commission \nFALSE = Filter for all offers regardless of if there is seller (AMS) commission",
    displayOptions: {
      show: {
        operation: ["getOffers", "searchProducts"],
      },
    },
  },

  /*
   * Key Seller
   */
  {
    displayName: "Key Seller",
    name: "isKeySeller",
    type: "boolean",
    default: false,
    description:
      "Filter for offers from Shopees key sellers TRUE = Offers from key sellers; \nFALSE = All offers regardless of the key seller status",
    displayOptions: {
      show: {
        operation: ["getOffers", "searchProducts"],
      },
    },
  },

  /*
   * Short Link
   */
  {
    displayName: "Short Link",
    name: "shortlink",
    type: "boolean",
    default: true,
    description:
      "Retorna os links já encurtados com seu tracking ID de afiliado.",
    displayOptions: {
      show: {
        operation: ["getOffers", "searchProducts"],
      },
    },
  },

  /*
   * Miniatura
   */
  {
    displayName: "Miniatura",
    name: "thumbnail",
    type: "boolean",
    default: false,
    description: "Adiciona fórmula IMAGE pronta para Google Sheets",
    displayOptions: {
      show: {
        operation: ["getOffers", "getOffersAutomation", "searchProducts"],
      },
    },
  },
];
