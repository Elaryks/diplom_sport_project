/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IssueReportItem2UserDto } from './IssueReportItem2UserDto';

export type IssueReportItemDto = {
    id?: number;
    name?: string | null;
    key?: string | null;
    items?: Array<IssueReportItem2UserDto> | null;
}