/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IssueAttachmentDto } from './IssueAttachmentDto';
import type { IssueCustomFieldDto } from './IssueCustomFieldDto';
import type { IssueProofRequirementDto } from './IssueProofRequirementDto';
import type { RecurringIssueDateDeadlineConfigUntilDto } from './RecurringIssueDateDeadlineConfigUntilDto';
import type { RecurringIssueExecutorConfigDto } from './RecurringIssueExecutorConfigDto';
import type { RecurringIssueRuleDto } from './RecurringIssueRuleDto';
import type { RoleShortDto } from './RoleShortDto';
import type { UserShortDto } from './UserShortDto';

export type RecurringIssueDto = {
    id?: number;
    name?: string | null;
    description?: string | null;
    awaitedResult?: string | null;
    boardId?: number;
    issueType?: string | null;
    isPaused?: boolean;
    createdOnRoleId?: number | null;
    createdByUserId?: number;
    createdByUser?: UserShortDto;
    proofRequirementId?: number | null;
    proofRequirement?: IssueProofRequirementDto;
    executorConfigs?: Array<RecurringIssueExecutorConfigDto> | null;
    rules?: Array<RecurringIssueRuleDto> | null;
    fields?: Array<IssueCustomFieldDto> | null;
    attachments?: Array<IssueAttachmentDto> | null;
    dateStart?: string | null;
    createOnWeekends?: boolean;
    dateDeadlineAfterTime?: string | null;
    dateDeadlineUntil?: RecurringIssueDateDeadlineConfigUntilDto;
    senderType?: string | null;
    senderRoleId?: number | null;
    senderRole?: RoleShortDto;
    dateCreatedOnTimezoneType?: string | null;
    createIfNoUsersWithWorkTime?: boolean;
    considerUserSchedule?: boolean;
    senderNotWorkingActionType?: number;
}