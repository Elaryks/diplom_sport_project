/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MenuItemWithChildrenDto = {
    id?: number;
    name?: string | null;
    key?: string | null;
    isPending?: boolean;
    isPendingValue?: string | null;
    children?: Array<MenuItemWithChildrenDto> | null;
    isCollapsible?: boolean;
}