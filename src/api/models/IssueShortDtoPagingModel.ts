/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IssueShortDto } from './IssueShortDto';
import type { PagingOptions } from './PagingOptions';

export type IssueShortDtoPagingModel = {
    pagingOptions?: PagingOptions;
    totalItems?: number;
    readonly totalPages?: number;
    items?: Array<IssueShortDto> | null;
}