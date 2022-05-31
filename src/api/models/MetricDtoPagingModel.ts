/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MetricDto } from './MetricDto';
import type { PagingOptions } from './PagingOptions';

export type MetricDtoPagingModel = {
    pagingOptions?: PagingOptions;
    totalItems?: number;
    readonly totalPages?: number;
    items?: Array<MetricDto> | null;
}