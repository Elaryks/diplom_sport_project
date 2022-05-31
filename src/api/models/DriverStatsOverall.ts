/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DriverStatsOverallDateDependant } from './DriverStatsOverallDateDependant';

export type DriverStatsOverall = {
    cardsInQueue?: number;
    usersPerDriver?: number;
    dateDependant?: DriverStatsOverallDateDependant;
}