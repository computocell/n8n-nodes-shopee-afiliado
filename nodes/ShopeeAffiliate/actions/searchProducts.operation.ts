import {
  IExecuteFunctions,
  INodeProperties,
  NodeOperationError,
} from 'n8n-workflow';

import { graphqlRequest }
  from '../transport/graphql.request';

import { commonProductProperties }
  from './common.properties';

export const searchProductsProperties:
  INodeProperties[] = [
    ...commonProductProperties,
  ];

export async function executeSearchProducts(
  context: IExecuteFunctions,
  index: number,
) {

  const keyword =
    context.getNodeParameter(
      'keyword',
      index,
    ) as string;

  const shopId =
    context.getNodeParameter(
      'shopId',
      index,
    ) as number;

  const productCatId =
    context.getNodeParameter(
      'productCatId',
      index,
    ) as number;

  const sortType =
    context.getNodeParameter(
      'sortType',
      index,
    ) as number;

  const page =
    context.getNodeParameter(
      'page',
      index,
    ) as number;

  const limit =
    context.getNodeParameter(
      'limit',
      index,
    ) as number;

  const isAMSOffer =
    context.getNodeParameter(
      'isAMSOffer',
      index,
    ) as boolean;

  const isKeySeller =
    context.getNodeParameter(
      'isKeySeller',
      index,
    ) as boolean;

  const shortlink =
    context.getNodeParameter(
      'shortlink',
      index,
    ) as boolean;

  const thumbnail =
    context.getNodeParameter(
      'thumbnail',
      index,
    ) as boolean;

  /*
   * Build Filters
   */

  const filters = [

    keyword
      ? `keyword: "${keyword}"`
      : null,

    shopId
      ? `shopId: ${shopId}`
      : null,

    productCatId
      ? `productCatId: ${productCatId}`
      : null,

    sortType
      ? `sortType: ${sortType}`
      : null,

    page
      ? `page: ${page}`
      : null,

    limit
      ? `limit: ${limit}`
      : null,

    isAMSOffer
      ? `isAMSOffer: true`
      : null,

    isKeySeller
      ? `isKeySeller: true`
      : null,

  ].filter(Boolean).join('\n');

  /*
   * Search Query
   */

  const query = `
		query {
			productOfferV2(
				${filters}
			) {
				nodes {

					itemId

					productName

					priceMin

					priceMax

					priceDiscountRate

					sales

					commissionRate

					sellerCommissionRate

					shopeeCommissionRate

					commission

					ratingStar

					imageUrl

					shopId

					shopName

					productLink

					offerLink

					productCatIds

					shopType

					periodStartTime

					periodEndTime
				}

				pageInfo {

					page

					limit

					hasNextPage
				}
			}
		}
	`;

  const response =
    await graphqlRequest(
      context,
      {
        query,
      },
    );

  if (
    response.errors?.length
  ) {

    throw new NodeOperationError(
      context.getNode(),

      response.errors[0]
        .message,

      {
        itemIndex: index,
      },
    );
  }

  const result =
    response.data
      .productOfferV2;

  const products =
    result.nodes || [];

  /*
   * Miniatura
   */

  if (thumbnail) {

    for (const product of products) {

      product.miniatura =
        `=IMAGE("${product.imageUrl}";4;400;400)`;
    }
  }

  /*
   * Short Links
   */

  if (shortlink) {

    await Promise.all(

      products.map(
        async (product: any) => {

          try {

            const shortLinkQuery = `
							mutation {
								generateShortLink(
									input: {
										originUrl: "${product.offerLink}"
									}
								) {
									shortLink
								}
							}
						`;

            const shortLinkResponse =
              await graphqlRequest(
                context,
                {
                  query:
                    shortLinkQuery,
                },
              );

            product.shortLink =
              shortLinkResponse
                ?.data
                ?.generateShortLink
                ?.shortLink || null;

          } catch {

            product.shortLink =
              null;
          }
        },
      ),
    );
  }

  return result;
}