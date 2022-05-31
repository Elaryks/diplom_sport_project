/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyInviteDto } from './CompanyInviteDto';
import type { PagingOptions } from './PagingOptions';

export type CompanyInviteDtoPagingModel = {
    pagingOptions?: PagingOptions;
    totalItems?: number;
    readonly totalPages?: number;
    items?: Array<CompanyInviteDto> | null;
}