/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RegulationContentQuestionAnswerDto } from './RegulationContentQuestionAnswerDto';

export type RegulationContentQuestionDto = {
    id?: number;
    name?: string | null;
    regulationContentId?: number;
    answers?: Array<RegulationContentQuestionAnswerDto> | null;
}