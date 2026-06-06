import {
  IExecuteFunctions,
  INodeProperties,
  NodeOperationError,
} from "n8n-workflow";

import { graphqlRequest } from "../transport/graphql.request";
import { commonProductProperties } from "./common.properties";

export async function executeGetOffersAutomation(
  context: IExecuteFunctions,
  index: number
) {
  const keyword = context.getNodeParameter("keyword", index) as string;

  const shopId = context.getNodeParameter("shopId", index) as number;

  const itemId = context.getNodeParameter("itemId", index) as number;

  const productCatId = context.getNodeParameter(
    "productCatId",
    index
  ) as number;

  const sortType = context.getNodeParameter("sortType", index) as number;

  const listType = context.getNodeParameter("listType", index) as number;

  const matchId = context.getNodeParameter("matchId", index) as number;

  const limit = context.getNodeParameter("limit", index) as number;

  const thumbnail = context.getNodeParameter("thumbnail", index) as boolean;

  const filters = [
    keyword ? `keyword: "${keyword}"` : null,

    shopId ? `shopId: ${shopId}` : null,

    itemId ? `itemId: ${itemId}` : null,

    productCatId ? `productCatId: ${productCatId}` : null,

    sortType ? `sortType: ${sortType}` : null,

    listType !== undefined ? `listType: ${listType}` : null,

    matchId ? `matchId: ${matchId}` : null,

    limit ? `limit: ${limit}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const query = `
		query {
			productOfferV2(
				${filters}
			) {
				nodes {

					itemId
          
					commissionRate

					commission
          
					imageUrl

					price

					priceMax

					priceMin

					productLink

					offerLink

					productName

					sales

					productCatIds

				}
			}
		}
	`;

  const response = await graphqlRequest(context, {
    query,
  });

  if (response.errors?.length) {
    throw new NodeOperationError(
      context.getNode(),

      response.errors[0].message,

      {
        itemIndex: index,
      }
    );
  }

  const result = response.data.productOfferV2;

  const products = result.nodes || [];

  if (thumbnail) {
    for (const product of products) {
      product.miniatura = `=IMAGE("${product.imageUrl}";4;400;400)`;
    }
  }

  return response;
}
