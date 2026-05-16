import {
  IExecuteFunctions,
  INodeProperties,
  NodeOperationError,
} from 'n8n-workflow';

import { graphqlRequest }
  from '../transport/graphql.request';

export const getOffersProperties:
  INodeProperties[] = [

    {
      displayName: 'Limit',

      name: 'limit',

      type: 'number',

      default: 10,

      displayOptions: {
        show: {
          operation: [
            'getOffers',
          ],
        },
      },
    },

    {
      displayName: 'Short Link',

      name: 'shortlink',

      type: 'boolean',

      default: true,

      displayOptions: {
        show: {
          operation: [
            'getOffers',
          ],
        },
      },

      description:
        'Gera shortlink afiliado',
    },

    {
      displayName: 'Miniatura',

      name: 'thumbnail',

      type: 'boolean',

      default: false,

      displayOptions: {
        show: {
          operation: [
            'getOffers',
          ],
        },
      },

      description:
        'Retorna fórmula IMAGE para Google Sheets',
    },
  ];

export async function executeGetOffers(
  context: IExecuteFunctions,
  index: number,
) {

  const limit =
    context.getNodeParameter(
      'limit',
      index,
    ) as number;

  const thumbnail =
    context.getNodeParameter(
      'thumbnail',
      index,
    ) as boolean;

  const shortlink =
    context.getNodeParameter(
      'shortlink',
      index,
    ) as boolean;

  /*
   * Busca ofertas
   */

  const offersQuery = `
		query {
			productOfferV2(
				limit: ${limit}
			) {
				nodes {
					itemId
					commissionRate
          commission
					imageUrl
					price
          productLink
					offerLink
					productName
					sales
          productCatIds
				}
			}
		}
	`;

  const offersResponse =
    await graphqlRequest(
      context,
      {
        query: offersQuery,
      },
    );

  if (
    offersResponse.errors?.length
  ) {

    throw new NodeOperationError(
      context.getNode(),

      offersResponse.errors[0]
        .message,

      {
        itemIndex: index,
      },
    );
  }

  const products =
    offersResponse.data
      .productOfferV2
      .nodes || [];

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

  return {
    nodes: products,
  };
}