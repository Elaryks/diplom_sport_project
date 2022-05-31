/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrgchartItemDto } from './OrgchartItemDto';
import type { RoleDto } from './RoleDto';

export type RolesWithOrgchartDto = {
    roles?: Array<RoleDto> | null;
    root?: OrgchartItemDto;
}