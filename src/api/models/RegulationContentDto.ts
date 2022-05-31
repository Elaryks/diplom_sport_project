/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RegulationContentQuestionDto } from './RegulationContentQuestionDto';
import type { UserShortDto } from './UserShortDto';

export type RegulationContentDto = {
    id?: number;
    content?: string | null;
    version?: number | null;
    regulationId?: number;
    dateCreated?: string;
    createdByUserId?: number | null;
    createdByUser?: UserShortDto;
    userPublisherId?: number | null;
    userPublisher?: UserShortDto;
    parentRegulationContentId?: number | null;
    questions?: Array<RegulationContentQuestionDto> | null;
}