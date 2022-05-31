/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BoardStatusTransitionActionDto } from './BoardStatusTransitionActionDto';

export type BoardStatusDto = {
    id?: number;
    name?: string | null;
    order?: number;
    boardId?: number;
    baseStatusKey?: string | null;
    colorSchemeKey?: string | null;
    requiredActions?: Array<BoardStatusTransitionActionDto> | null;
}