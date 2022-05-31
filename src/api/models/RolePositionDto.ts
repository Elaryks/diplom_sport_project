/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RolePositionDto = {
    id?: number;
    name?: string | null;
    description?: string | null;
    roleId?: number;
    order?: number;
    parentPositionId?: number | null;
}