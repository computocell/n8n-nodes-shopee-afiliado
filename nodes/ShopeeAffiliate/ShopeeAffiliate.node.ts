import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

import { graphqlRequest } from './transport/graphql.request';

export class ShopeeAffiliate implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Shopee Affiliate',
    name: 'shopeeAffiliate',
    icon: 'file:shopee.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Consume Shopee Affiliate API',
    defaults: {
      name: 'Shopee Affiliate',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'shopeeAffiliateApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
          {
            name: 'Get Product Offers',
            value: 'getOffers',
          },
        ],
        default: 'getOffers',
      },
    ],
  };

  async execute(
    this: IExecuteFunctions,
  ): Promise<INodeExecutionData[][]> {

    const operation =
      this.getNodeParameter('operation', 0);

    let responseData;

    if (operation === 'getOffers') {

      const body = {
        query: `
          query {
            productOfferV2(limit: 10) {
              nodes {
                itemId
                productName
                price
                commissionRate
                sales
              }
            }
          }
        `,
      };

      responseData = await graphqlRequest(this, body);
    }

    return [this.helpers.returnJsonArray(responseData)];
  }
}