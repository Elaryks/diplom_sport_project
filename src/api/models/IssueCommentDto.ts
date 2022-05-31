/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IssueCommentAttachmentDto } from './IssueCommentAttachmentDto';
import type { IssueCommentRecipientDto } from './IssueCommentRecipientDto';

export type IssueCommentDto = {
    id?: number;
    issueHistoryId?: number;
    text?: string | null;
    attachments?: Array<IssueCommentAttachmentDto> | null;
    recipients?: Array<IssueCommentRecipientDto> | null;
    isMessage?: boolean;
}