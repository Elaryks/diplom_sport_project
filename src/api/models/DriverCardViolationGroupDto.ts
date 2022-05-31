/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IssueIndicatorDto } from './IssueIndicatorDto';

export type DriverCardViolationGroupDto = {
    violation?: IssueIndicatorDto;
    issueIds?: Array<number> | null;
}