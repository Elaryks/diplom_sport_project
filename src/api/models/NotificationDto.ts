/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NotificationAdditionalParamsDto } from './NotificationAdditionalParamsDto';
import type { UserDto } from './UserDto';

export type NotificationDto = {
    id?: number;
    senderId?: number | null;
    sender?: UserDto;
    content?: string | null;
    isRead?: boolean;
    type?: number;
    additionalParams?: NotificationAdditionalParamsDto;
}