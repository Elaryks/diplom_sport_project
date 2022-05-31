/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BoardStatusDto } from './BoardStatusDto';

export type BoardStatusTransitionActionDto = {
    id?: number;
    issueStatusId?: number;
    issueStatus?: BoardStatusDto;
    baseTransitionActionKey?: string | null;
}