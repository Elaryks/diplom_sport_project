/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BoardDto } from './BoardDto';
import type { IssueAttachmentDto } from './IssueAttachmentDto';
import type { IssueCalculatedDto } from './IssueCalculatedDto';
import type { IssueCustomFieldDto } from './IssueCustomFieldDto';
import type { IssueParticipantDto } from './IssueParticipantDto';
import type { IssueProofDto } from './IssueProofDto';
import type { IssueProofRequirementDto } from './IssueProofRequirementDto';
import type { IssueStatusDto } from './IssueStatusDto';
import type { RoleShortDto } from './RoleShortDto';
import type { UserShortDto } from './UserShortDto';

export type IssueDto = {
    id?: number;
    subId?: string | null;
    name?: string | null;
    description?: string | null;
    awaitedResult?: string | null;
    boardId?: number;
    board?: BoardDto;
    createdByUserId?: number | null;
    createdByUser?: UserShortDto;
    proofRequirementId?: number | null;
    proofRequirement?: IssueProofRequirementDto;
    proof?: IssueProofDto;
    executorUserId?: number;
    executorUser?: UserShortDto;
    roleId?: number | null;
    role?: RoleShortDto;
    dateCreated?: string;
    dateDeadline?: string | null;
    dateWorkStart?: string | null;
    fields?: Array<IssueCustomFieldDto> | null;
    attachments?: Array<IssueAttachmentDto> | null;
    type?: string | null;
    participants?: Array<IssueParticipantDto> | null;
    currentStatus?: IssueStatusDto;
    calculated?: IssueCalculatedDto;
}