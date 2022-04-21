import type { ParamMatcher } from '@sveltejs/kit';
// import { ObjectId } from 'mongodb';

// export const match: ParamMatcher = (id) => {
// 	if (ObjectId.isValid(id)) {
// 		if (String(new ObjectId(id)) === id) return true;
// 		return false;
// 	}
// 	return false;
// };

export const match: ParamMatcher = (id) => id.length === 24;
