/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PermissionDto = {
    id?: number;
    name?: string | null;
    description?: string | null;
    key?: string | null;
    hintKey?: string | null;
    children?: Array<PermissionDto> | null;
}