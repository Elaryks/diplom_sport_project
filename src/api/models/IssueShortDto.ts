/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IssueCalculatedShortDto } from './IssueCalculatedShortDto';
import type { IssueStatusDto } from './IssueStatusDto';
import type { UserShortDto } from './UserShortDto';

export type IssueShortDto = {
    id?: number;
    subId?: string | null;
    name?: string | null;
    awaitedResult?: string | null;
    boardId?: number;
    executorUserId?: number;
    executorUser?: UserShortDto;
    dateDeadline?: string | null;
    type?: string | null;
    currentStatus?: IssueStatusDto;
    calculated?: IssueCalculatedShortDto;
}