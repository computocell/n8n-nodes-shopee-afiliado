import { IExecuteFunctions } from 'n8n-workflow';
import { executeSearchProducts } from '../searchProducts.operation';
import { graphqlRequest } from '../../transport/graphql.request';

jest.mock('../../transport/graphql.request');
const mockedGraphqlRequest = graphqlRequest as jest.MockedFunction<typeof graphqlRequest>;

describe('searchProducts operation', () => {
  it('should build correct GraphQL query and return products', async () => {
    const fakeContext = {
      getNodeParameter: jest.fn()
        .mockImplementation((name: string) => {
          const map: any = {
            keyword: 'test',
            shopId: 0,
            productCatId: 0,
            sortType: 1,
            page: 1,
            limit: 10,
            isAMSOffer: false,
            isKeySeller: false,
            shortlink: false,
            thumbnail: false,
          };
          return map[name];
        }),
    } as unknown as IExecuteFunctions;

    const mockResponse = {
      data: {
        productOfferV2: {
          nodes: [{ itemId: 456, productName: 'Produto Busca' }],
        },
      },
      errors: undefined,
    };
    mockedGraphqlRequest.mockResolvedValueOnce(mockResponse);

    const result = await executeSearchProducts(fakeContext, 0);
    expect(result).toBeDefined();
    expect(result.data.productOfferV2.nodes?.[0].itemId).toBe(456);
  });
});
