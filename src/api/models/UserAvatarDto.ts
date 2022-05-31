/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StaticFileDto } from './StaticFileDto';

export type UserAvatarDto = {
    id?: number;
    userId?: number;
    imageId?: number | null;
    image?: StaticFileDto;
}