/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DriverCardCalculatedDto } from './DriverCardCalculatedDto';
import type { DriverCardViolationGroupDto } from './DriverCardViolationGroupDto';
import type { IssueForDriverDto } from './IssueForDriverDto';
import type { UserShortDto } from './UserShortDto';

export type DriverCardDto = {
    controlSessionId?: number;
    user?: UserShortDto;
    issues?: Array<IssueForDriverDto> | null;
    violationGroups?: Array<DriverCardViolationGroupDto> | null;
    calculated?: DriverCardCalculatedDto;
    text?: string | null;
}