/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AutocompleteModel } from './AutocompleteModel';
import type { PagingOptions } from './PagingOptions';

export type AutocompleteModelPagingModel = {
    pagingOptions?: PagingOptions;
    totalItems?: number;
    readonly totalPages?: number;
    items?: Array<AutocompleteModel> | null;
}