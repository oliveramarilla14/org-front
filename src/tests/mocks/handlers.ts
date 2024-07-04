import { clubsHandlers } from './uriHandlers/clubsHandlers';
import { cuotasHandlers } from './uriHandlers/cuotasHandlers';
import { playersHandlers } from './uriHandlers/playersHandlers';
import { positionsHandlers } from './uriHandlers/positionsHandlers';

export const handlers = [...positionsHandlers, ...clubsHandlers, ...playersHandlers, ...cuotasHandlers];
