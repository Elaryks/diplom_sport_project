/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User2CompanyDto } from './User2CompanyDto';
import type { User2RoleDto } from './User2RoleDto';
import type { UserAvatarDto } from './UserAvatarDto';
import type { UserContactDto } from './UserContactDto';
import type { UserEducationHistoryDto } from './UserEducationHistoryDto';
import type { UserTypeDto } from './UserTypeDto';

export type UserDto = {
    id?: number;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    name?: string | null;
    nameShort?: string | null;
    nameFallback?: string | null;
    phoneNumber?: string | null;
    timeZoneFromUtc?: number;
    email?: string | null;
    color?: string | null;
    isEmailConfirmed?: boolean;
    password?: string | null;
    avatar?: UserAvatarDto;
    contact?: UserContactDto;
    types?: Array<UserTypeDto> | null;
    currentPlatformContext?: string | null;
    currentCultureKey?: string | null;
    companies?: Array<User2CompanyDto> | null;
    roles?: Array<User2RoleDto> | null;
    currentCompanyId?: number | null;
    educationHistory?: Array<UserEducationHistoryDto> | null;
    dateLastOnline?: string | null;
    dateControlSessionLastInteraction?: string | null;
}