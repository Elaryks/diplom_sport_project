/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BoardDto } from './BoardDto';
import type { MenuItemDto } from './MenuItemDto';
import type { MenuItemWithChildrenDto } from './MenuItemWithChildrenDto';
import type { UserDto } from './UserDto';

export type InitialInfoDto = {
    identity?: UserDto;
    menuItems?: Array<MenuItemWithChildrenDto> | null;
    settingsTabs?: Array<MenuItemDto> | null;
    boards?: Array<BoardDto> | null;
    permissions?: Array<string> | null;
}