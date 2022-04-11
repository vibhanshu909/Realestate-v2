import { get as getRequest } from '$lib/site/detail';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = getRequest;
