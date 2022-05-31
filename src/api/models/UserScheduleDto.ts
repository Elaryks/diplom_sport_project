/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserScheduleSubstituteDto } from './UserScheduleSubstituteDto';

export type UserScheduleDto = {
    id?: number;
    name?: string | null;
    shortName?: string | null;
    type?: number;
    overrideAllUsersFunctions?: boolean | null;
    dateFrom?: string;
    dateTo?: string;
    timeFrom?: string | null;
    timeTo?: string | null;
    user2RoleId?: number;
    substitute?: UserScheduleSubstituteDto;
    substitutesConfig?: Array<UserScheduleSubstituteDto> | null;
    createdByUserId?: number | null;
}