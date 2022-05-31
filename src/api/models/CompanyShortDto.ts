/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyGlossaryItemDto } from './CompanyGlossaryItemDto';
import type { DayOfWeek } from './DayOfWeek';
import type { StaticFileDto } from './StaticFileDto';

export type CompanyShortDto = {
    id?: number;
    name?: string | null;
    nameFallback?: string | null;
    description?: string | null;
    timeZoneFromUtc?: number;
    color?: string | null;
    orgchartType?: string | null;
    glossary?: Array<CompanyGlossaryItemDto> | null;
    imageId?: number | null;
    image?: StaticFileDto;
    weekStart?: DayOfWeek;
}