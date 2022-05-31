/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserShortDto } from './UserShortDto';

export type IssueParticipantDto = {
    id?: number;
    issueId?: number;
    userId?: number;
    user?: UserShortDto;
}