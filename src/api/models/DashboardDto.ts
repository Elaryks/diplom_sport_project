/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Metric2DashboardDto } from './Metric2DashboardDto';
import type { UserSelectionRuleDto } from './UserSelectionRuleDto';
import type { UserShortDto } from './UserShortDto';

export type DashboardDto = {
    id?: number;
    name?: string | null;
    dateCreated?: string;
    createdByUserId?: number | null;
    createdByUser?: UserShortDto;
    metrics?: Array<Metric2DashboardDto> | null;
    userSelectionRules?: Array<UserSelectionRuleDto> | null;
}