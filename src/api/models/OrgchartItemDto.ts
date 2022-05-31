/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OrgchartItemDto = {
    roleId?: number;
    childrenAreHorizontal?: boolean;
    children?: Array<OrgchartItemDto> | null;
}