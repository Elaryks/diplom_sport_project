/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RegulationCommentDto } from './RegulationCommentDto';
import type { RegulationHistoryReactionDto } from './RegulationHistoryReactionDto';
import type { UserShortDto } from './UserShortDto';

export type RegulationHistoryDto = {
    id?: number;
    regulationContentId?: number;
    dateCreated?: string;
    createdByUserId?: number | null;
    createdByUser?: UserShortDto;
    comment?: RegulationCommentDto;
    reactions?: Array<RegulationHistoryReactionDto> | null;
}