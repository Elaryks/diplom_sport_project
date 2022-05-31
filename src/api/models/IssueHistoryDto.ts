/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IssueCommentDto } from './IssueCommentDto';
import type { IssueHistoryActionDto } from './IssueHistoryActionDto';
import type { IssueProofDto } from './IssueProofDto';
import type { IssueStatusDto } from './IssueStatusDto';
import type { UserShortDto } from './UserShortDto';

export type IssueHistoryDto = {
    id?: number;
    dateCreated?: string;
    dateUpdated?: string | null;
    issueId?: number;
    createdByUserId?: number | null;
    createdByUser?: UserShortDto;
    status?: IssueStatusDto;
    proof?: IssueProofDto;
    comment?: IssueCommentDto;
    actions?: Array<IssueHistoryActionDto> | null;
}