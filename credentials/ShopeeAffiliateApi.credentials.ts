import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class ShopeeAffiliateApi implements ICredentialType {
  name = 'shopeeAffiliateApi';

  displayName = 'Shopee Affiliate API';

  documentationUrl =
    'https://affiliate.shopee.com.br/open_api/document';

  properties: INodeProperties[] = [
    {
      displayName: 'App ID',
      name: 'appId',
      type: 'string',
      default: '',
      required: true,
    },
    {
      displayName: 'Secret',
      name: 'secret',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
    },
  ];
}