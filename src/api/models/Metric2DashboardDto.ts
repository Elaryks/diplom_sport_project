/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MetricDto } from './MetricDto';

export type Metric2DashboardDto = {
    id?: number;
    dashboardId?: number;
    metricId?: number;
    metric?: MetricDto;
}