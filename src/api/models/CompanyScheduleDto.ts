/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DayOfWeek } from './DayOfWeek';

export type CompanyScheduleDto = {
    id?: number;
    companyId?: number;
    isActive?: boolean;
    dayOfWeek?: DayOfWeek;
    timeDayStart?: string;
    timeDayEnd?: string;
}