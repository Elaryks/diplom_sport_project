/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IssueReportItemDto } from './IssueReportItemDto';
import type { UserShortDto } from './UserShortDto';

export type IssueReportDto = {
    users?: Array<UserShortDto> | null;
    items?: Array<IssueReportItemDto> | null;
}