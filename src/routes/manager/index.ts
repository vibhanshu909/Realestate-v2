import { get as getHandler } from '$lib/manager/sites/index';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = getHandler();
