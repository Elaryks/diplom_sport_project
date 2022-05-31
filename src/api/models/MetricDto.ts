/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MetricValueDto } from './MetricValueDto';
import type { UserSelectionRuleDto } from './UserSelectionRuleDto';
import type { UserShortDto } from './UserShortDto';

export type MetricDto = {
    id?: number;
    name?: string | null;
    description?: string | null;
    interval?: string | null;
    dateCreated?: string;
    createdByUserId?: number | null;
    createdByUser?: UserShortDto;
    values?: Array<MetricValueDto> | null;
    userSelectionRules?: Array<UserSelectionRuleDto> | null;
}