/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RolePositionDto } from './RolePositionDto';
import type { RoleShortDto } from './RoleShortDto';

export type RecurringIssueExecutorConfigDto = {
    id?: number;
    recurringIssueId?: number;
    type?: string | null;
    roleId?: number | null;
    role?: RoleShortDto;
    rolePositionId?: number | null;
    rolePosition?: RolePositionDto;
    rolePositionType?: number | null;
    isExcluded?: boolean;
}