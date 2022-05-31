/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoleCalculatedDto } from './RoleCalculatedDto';
import type { RoleClaimDto } from './RoleClaimDto';
import type { RolePositionDto } from './RolePositionDto';
import type { User2RoleDto } from './User2RoleDto';

export type RoleDto = {
    id?: number;
    name?: string | null;
    awaitedResult?: string | null;
    colorHex?: string | null;
    applyColorToChildren?: boolean | null;
    companyId?: number;
    type?: string | null;
    order?: number;
    level?: number;
    childrenAreHorizontal?: boolean;
    calculated?: RoleCalculatedDto;
    isScheduleUpdateAllowed?: boolean;
    parentRoleId?: number | null;
    childRoles?: Array<RoleDto> | null;
    claims?: Array<RoleClaimDto> | null;
    users?: Array<User2RoleDto> | null;
    positions?: Array<RolePositionDto> | null;
}