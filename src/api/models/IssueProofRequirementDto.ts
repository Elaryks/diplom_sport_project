/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IssueProofRequirementRuleDto } from './IssueProofRequirementRuleDto';

export type IssueProofRequirementDto = {
    id?: number;
    text?: string | null;
    rules?: Array<IssueProofRequirementRuleDto> | null;
}