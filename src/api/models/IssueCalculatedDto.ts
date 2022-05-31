/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BoardStatusActionBaseDto } from './BoardStatusActionBaseDto';
import type { BoardStatusDto } from './BoardStatusDto';
import type { IssueIndicatorDto } from './IssueIndicatorDto';

export type IssueCalculatedDto = {
    updateLevel?: string | null;
    actions?: Array<BoardStatusActionBaseDto> | null;
    nextStatuses?: Array<BoardStatusDto> | null;
    indicators?: Array<IssueIndicatorDto> | null;
    blockedFields?: Array<string> | null;
    dateWorkStartTo?: string | null;
    allowedToSendCommentTypes?: Array<string> | null;
}