/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RolePositionDto } from './RolePositionDto';
import type { RoleShortDto } from './RoleShortDto';

export type UserSelectionRuleDto = {
    id?: number;
    dashboardId?: number;
    roleId?: number | null;
    role?: RoleShortDto;
    rolePositionId?: number | null;
    rolePosition?: RolePositionDto;
    rolePositionType?: number | null;
    isExcluded?: boolean;
}