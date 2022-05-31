/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserShortDto } from './UserShortDto';

export type DriverStatsDto = {
    driver?: UserShortDto;
    processedCards?: number | null;
    processingTimeAvgInSeconds?: number | null;
    violationsFixed?: number | null;
    actionsText?: string | null;
}