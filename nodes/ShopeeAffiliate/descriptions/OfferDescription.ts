import { INodeProperties } from 'n8n-workflow';

export const offerOperations: INodeProperties[] = [
	{
		displayName: 'Category ID',
		name: 'categoryId',
		type: 'string',
		default: '',
		description: 'ID da categoria',
	},
];