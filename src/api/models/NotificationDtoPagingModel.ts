/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NotificationDto } from './NotificationDto';
import type { PagingOptions } from './PagingOptions';

export type NotificationDtoPagingModel = {
    pagingOptions?: PagingOptions;
    totalItems?: number;
    readonly totalPages?: number;
    items?: Array<NotificationDto> | null;
}