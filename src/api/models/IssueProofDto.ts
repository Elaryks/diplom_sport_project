/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IssueHistoryDto } from './IssueHistoryDto';

export type IssueProofDto = {
    id?: number;
    issueId?: number;
    historyId?: number | null;
    history?: IssueHistoryDto;
}