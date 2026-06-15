import { IExecuteFunctions } from 'n8n-workflow';
import { executeGetOffers } from '../getOffers.operation';
import { graphqlRequest } from '../../transport/graphql.request';

jest.mock('../../transport/graphql.request');
const mockedGraphqlRequest = graphqlRequest as jest.MockedFunction<typeof graphqlRequest>;

describe('getOffers operation', () => {
  it('should build correct GraphQL query and return products', async () => {
    const fakeContext = {
      getNodeParameter: jest.fn()
        .mockImplementation((name: string) => {
          const map: any = {
            keyword: 'test',
            shopId: 0,
            itemId: 0,
            productCatId: 0,
            sortType: 1,
            listType: 0,
            matchId: 0,
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
          nodes: [{ itemId: 123, productName: 'Produto Teste' }],
        },
      },
      errors: undefined,
    };
    mockedGraphqlRequest.mockResolvedValueOnce(mockResponse);

    const result = await executeGetOffers(fakeContext, 0);
    expect(result).toBeDefined();
    expect(result.data.productOfferV2.nodes?.[0].itemId).toBe(123);
  });
});
