/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoleShortDto } from './RoleShortDto';
import type { UserScheduleDto } from './UserScheduleDto';
import type { UserScheduleSubstituteDto } from './UserScheduleSubstituteDto';
import type { UserShortDto } from './UserShortDto';

export type User2RoleDto = {
    id?: number;
    userId?: number;
    user?: UserShortDto;
    type?: string | null;
    dateFrom?: string;
    dateTo?: string | null;
    positionId?: number | null;
    roleId?: number;
    role?: RoleShortDto;
    substitutes?: Array<UserScheduleSubstituteDto> | null;
    schedules?: Array<UserScheduleDto> | null;
    hasAnyScheduleWithSubstitute?: boolean;
}