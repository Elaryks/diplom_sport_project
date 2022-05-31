/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserAvatarDto } from './UserAvatarDto';
import type { UserContactDto } from './UserContactDto';
import type { UserRegulationStatsDto } from './UserRegulationStatsDto';

export type UserWithRegulationStatsDto = {
    id?: number;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    name?: string | null;
    nameShort?: string | null;
    nameFallback?: string | null;
    contact?: UserContactDto;
    timeZoneFromUtc?: number;
    email?: string | null;
    color?: string | null;
    avatar?: UserAvatarDto;
    regulationStats?: UserRegulationStatsDto;
}