export const heirarchy = (segmentId, levelId, streamId, categoryId) => [
	{
		name: 'segments',
		path: '/segments',
	},
	{
		name: 'levels',
		path: `/segments/${segmentId}`,
	},
	{
		name: 'streams',
		path: `/segments/${segmentId}/levels/${levelId}`,
	},
	{
		name: 'category',
		path: `/segments/${segmentId}/levels/${levelId}/streams/${streamId}`,
	},
	{
		name: 'subjects',
		path: `/segments/${segmentId}/levels/${levelId}/streams/${streamId}/categories/${categoryId}`,
	},
];
