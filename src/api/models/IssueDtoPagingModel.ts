/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IssueDto } from './IssueDto';
import type { PagingOptions } from './PagingOptions';

export type IssueDtoPagingModel = {
    pagingOptions?: PagingOptions;
    totalItems?: number;
    readonly totalPages?: number;
    items?: Array<IssueDto> | null;
}