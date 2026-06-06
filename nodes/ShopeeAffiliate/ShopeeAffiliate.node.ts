import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

import {
  generateShortLinkProperties,
  executeGenerateShortLink,
  executeGetOffers,
  executeSearchProducts,
  executeGetOffersAutomation,
} from "./actions";

import { commonProductProperties } from "./actions/common.properties";

export class ShopeeAffiliate implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Shopee Affiliate",

    name: "shopeeAffiliate",

    icon: "file:shopee.svg",

    group: ["transform"],

    version: 1,

    subtitle: '={{$parameter["operation"]}}',

    description: "Shopee Affiliate API",

    defaults: {
      name: "Shopee Affiliate",
    },

    inputs: ["main"],

    outputs: ["main"],

    credentials: [
      {
        name: "shopeeAffiliateApi",

        required: true,
      },
    ],

    properties: [
      /*
       * Operation
       */

      {
        displayName: "Operation",

        name: "operation",

        type: "options",

        noDataExpression: true,

        options: [
          {
            name: "Generate Short Link",

            value: "generateShortLink",
          },

          {
            name: "Get Offers Automation",

            value: "getOffersAutomation",
          },

          {
            name: "Get Offers",

            value: "getOffers",
          },

          {
            name: "Search Products",

            value: "searchProducts",
          },
        ],

        default: "generateShortLink",
      },

      /*
       * Operations Properties
       */

      ...generateShortLinkProperties,

      ...commonProductProperties,

      // ...searchProductsProperties,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();

    const promises = items.map(async (_, i) => {
      const resultItems: INodeExecutionData[] = [];

      const operation = this.getNodeParameter("operation", i);

      /*
       * Generate Short Link
       */

      if (operation === "generateShortLink") {
        const data: any = await executeGenerateShortLink(this, i);

        if (data && Array.isArray(data)) {
          for (const item of data) {
            resultItems.push({
              json: item,
            });
          }
        } else {
          resultItems.push({
            json: data,
          });
        }
      }

      /*
       * Get Offers
       */

      if (operation === "getOffers") {
        const data = await executeGetOffers(this, i);

        resultItems.push({
          json: data,
        });
      }

      /*
       * Get Offers Automation
       */

      if (operation === "getOffersAutomation") {
        const data: any = await executeGetOffersAutomation(this, i);

        if (data.nodes && Array.isArray(data.nodes)) {
          for (const item of data.nodes) {
            resultItems.push({
              json: item,
            });
          }
        } else {
          resultItems.push({
            json: data,
          });
        }
      }

      /*
       * Search Products
       */

      if (operation === "searchProducts") {
        const data = await executeSearchProducts(this, i);

        resultItems.push({
          json: data,
        });
      }

      return resultItems;
    });

    const resolvedData = await Promise.all(promises);
    const returnData = resolvedData.reduce((acc, val) => acc.concat(val), []);

    return [returnData];
  }
}