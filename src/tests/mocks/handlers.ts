import { clubsHandlers } from './uriHandlers/clubsHandlers';
import { playersHandlers } from './uriHandlers/playersHandlers';
import { positionsHandlers } from './uriHandlers/positionsHandlers';

export const handlers = [...positionsHandlers, ...clubsHandlers, ...playersHandlers];
