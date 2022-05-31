/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type IssueCustomFieldDto = {
    id?: number;
    name?: string | null;
    order?: number;
    recurringIssueId?: number | null;
    issueId?: number | null;
    key?: string | null;
    valueType?: string | null;
    valueBool?: boolean | null;
    valueString?: string | null;
    valueInt?: number | null;
    valueDateTime?: string | null;
}