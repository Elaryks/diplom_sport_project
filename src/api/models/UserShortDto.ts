/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User2CompanyDto } from './User2CompanyDto';
import type { UserAvatarDto } from './UserAvatarDto';
import type { UserContactDto } from './UserContactDto';

export type UserShortDto = {
    id?: number;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    name?: string | null;
    nameShort?: string | null;
    nameFallback?: string | null;
    contact?: UserContactDto;
    companies?: Array<User2CompanyDto> | null;
    timeZoneFromUtc?: number;
    email?: string | null;
    color?: string | null;
    avatar?: UserAvatarDto;
    dateLastOnline?: string | null;
    dateControlSessionLastInteraction?: string | null;
}