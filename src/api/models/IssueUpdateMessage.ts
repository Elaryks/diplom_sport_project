/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type IssueUpdateMessage = {
    boardId?: number;
    updatedBoardStatusIds?: Array<number> | null;
    issueId?: number;
    type?: string | null;
}