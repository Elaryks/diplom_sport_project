/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StaticFileDto } from './StaticFileDto';

export type IssueAttachmentDto = {
    id?: number;
    issueId?: number;
    fileId?: number;
    file?: StaticFileDto;
}