/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User2RoleDto } from './User2RoleDto';

export type UserScheduleSubstituteDto = {
    id?: number;
    userScheduleId?: number;
    user2RoleId?: number;
    user2Role?: User2RoleDto;
    roleId?: number | null;
    userId?: number | null;
}