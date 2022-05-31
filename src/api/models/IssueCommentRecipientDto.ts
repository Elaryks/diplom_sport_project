/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserShortDto } from './UserShortDto';

export type IssueCommentRecipientDto = {
    id?: number;
    issueCommentId?: number;
    userId?: number;
    user?: UserShortDto;
}