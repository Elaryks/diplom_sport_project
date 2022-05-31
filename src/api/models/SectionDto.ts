/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Section2RegulationDto } from './Section2RegulationDto';
import type { UserRegulationStatsDto } from './UserRegulationStatsDto';
import type { UserSelectionRuleDto } from './UserSelectionRuleDto';
import type { UserShortDto } from './UserShortDto';

export type SectionDto = {
    id?: number;
    name?: string | null;
    description?: string | null;
    dateCreated?: string;
    stats?: UserRegulationStatsDto;
    createdByUserId?: number | null;
    createdByUser?: UserShortDto;
    regulations?: Array<Section2RegulationDto> | null;
    userSelectionRules?: Array<UserSelectionRuleDto> | null;
}