/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyGlossaryItemDto } from './CompanyGlossaryItemDto';
import type { CompanyScheduleDto } from './CompanyScheduleDto';
import type { DayOfWeek } from './DayOfWeek';
import type { RoleDto } from './RoleDto';
import type { StaticFileDto } from './StaticFileDto';
import type { UserShortDto } from './UserShortDto';

export type CompanyDto = {
    id?: number;
    name?: string | null;
    nameFallback?: string | null;
    description?: string | null;
    imageId?: number | null;
    image?: StaticFileDto;
    timeZoneFromUtc?: number;
    color?: string | null;
    userOwnerId?: number | null;
    userOwner?: UserShortDto;
    orgchartType?: string | null;
    weekStart?: DayOfWeek;
    scheduleIsSameOnWeekdays?: boolean;
    schedule?: Array<CompanyScheduleDto> | null;
    roles?: Array<RoleDto> | null;
    glossary?: Array<CompanyGlossaryItemDto> | null;
}