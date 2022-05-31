/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StaticFileDto } from './StaticFileDto';

export type IssueCommentAttachmentDto = {
    id?: number;
    issueCommentId?: number;
    fileId?: number;
    file?: StaticFileDto;
    order?: number;
}