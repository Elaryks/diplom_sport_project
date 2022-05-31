/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserShortDto } from './UserShortDto';

export type ControlSessionHistoryDto = {
    id?: number;
    dateCreated?: string;
    controlSessionId?: number;
    createdByUserId?: number | null;
    createdByUser?: UserShortDto;
    text?: string | null;
    baseKey?: string | null;
    actionResultKey?: string | null;
    datePostpone?: string | null;
    colorSchemeKey?: string | null;
    icon?: string | null;
    name?: string | null;
    description?: string | null;
}