import { clubsHandlers } from './uriHandlers/clubsHandlers';
import { positionsHandlers } from './uriHandlers/positionsHandlers';

export const handlers = [...positionsHandlers, ...clubsHandlers];
