/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BoardStatusDto } from './BoardStatusDto';

export type IssueStatusDto = {
    id?: number;
    issueHistoryId?: number;
    boardStatusId?: number;
    boardStatus?: BoardStatusDto;
}