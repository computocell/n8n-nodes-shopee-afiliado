import { INodeProperties } from 'n8n-workflow';

export const reportOperations: INodeProperties[] = [
	{
		displayName: 'Date From',
		name: 'dateFrom',
		type: 'dateTime',
		default: '',
	},
	{
		displayName: 'Date To',
		name: 'dateTo',
		type: 'dateTime',
		default: '',
	},
];