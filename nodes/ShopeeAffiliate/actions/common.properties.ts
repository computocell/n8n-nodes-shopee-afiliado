import { INodeProperties } from 'n8n-workflow';

export const commonProductProperties: INodeProperties[] = [
  /*
   * Keyword
   */
  {
    displayName: 'Keyword',
    name: 'keyword',
    type: 'string',
    default: '',
    description: 'Busca produtos pelo nome',
    displayOptions: {
      show: {
        operation: ['getOffers', 'searchProducts'],
      },
    },
  },

  /*
   * Shop ID
   */
  {
    displayName: 'Shop ID',
    name: 'shopId',
    type: 'number',
    default: 0,
    description: 'Filtra produtos de uma loja específica',
    displayOptions: {
      show: {
        operation: ['getOffers', 'searchProducts'],
      },
    },
  },

  /*
   * Category ID
   */
  {
    displayName: 'Category ID',
    name: 'productCatId',
    type: 'number',
    default: 0,
    description: 'Filtra produtos por categoria Shopee',
    displayOptions: {
      show: {
        operation: ['getOffers', 'searchProducts'],
      },
    },
  },

  /*
   * Sort Type
   */
  {
    displayName: 'Sort Type',
    name: 'sortType',
    type: 'options',
    default: 1,
    description: 'Define a ordenação dos produtos retornados',
    displayOptions: {
      show: {
        operation: ['getOffers', 'searchProducts'],
      },
    },
    options: [
      {
        name: 'Relevance',
        value: 1,
        description: 'Ordena por relevância da keyword',
      },
      {
        name: 'Items Sold',
        value: 2,
        description: 'Produtos mais vendidos primeiro',
      },
      {
        name: 'Price Desc',
        value: 3,
        description: 'Maior preço primeiro',
      },
      {
        name: 'Price Asc',
        value: 4,
        description: 'Menor preço primeiro',
      },
      {
        name: 'Commission Desc',
        value: 5,
        description: 'Maior comissão primeiro',
      },
    ],
  },

  /*
   * Page
   */
  {
    displayName: 'Page',
    name: 'page',
    type: 'number',
    default: 1,
    description: 'Número da página da consulta',
    displayOptions: {
      show: {
        operation: ['getOffers', 'searchProducts'],
      },
    },
  },

  /*
   * Limit
   */
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 10,
    description: 'Quantidade máxima de produtos retornados',
    displayOptions: {
      show: {
        operation: ['getOffers', 'searchProducts'],
      },
    },
  },

  /*
   * AMS Offer
   */
  {
    displayName: 'AMS Offer',
    name: 'isAMSOffer',
    type: 'boolean',
    default: false,
    description:
      'Filter by type of offer \n TRUE = Filter for offers that have seller (AMS) commission \nFALSE = Filter for all offers regardless of if there is seller (AMS) commission',
    displayOptions: {
      show: {
        operation: ['getOffers', 'searchProducts'],
      },
    },
  },

  /*
   * Key Seller
   */
  {
    displayName: 'Key Seller',
    name: 'isKeySeller',
    type: 'boolean',
    default: false,
    description:
      'Filter for offers from Shopees key sellers TRUE = Offers from key sellers; \nFALSE = All offers regardless of the key seller status',
    displayOptions: {
      show: {
        operation: ['getOffers', 'searchProducts'],
      },
    },
  },

  /*
   * Short Link
   */
  {
    displayName: 'Short Link',
    name: 'shortlink',
    type: 'boolean',
    default: true,
    description:
      'Gera automaticamente links curtos de afiliado. Pode aumentar o tempo da execução devido às requisições extras.',
    displayOptions: {
      show: {
        operation: ['getOffers', 'searchProducts'],
      },
    },
  },

  /*
   * Miniatura
   */
  {
    displayName: 'Miniatura',
    name: 'thumbnail',
    type: 'boolean',
    default: false,
    description: 'Adiciona fórmula IMAGE pronta para Google Sheets',
    displayOptions: {
      show: {
        operation: ['getOffers', 'searchProducts'],
      },
    },
  },
];
