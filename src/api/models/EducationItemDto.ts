/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EducationItemDto = {
    id?: number;
    name?: string | null;
    description?: string | null;
    videoId?: string | null;
    isAvailable?: boolean;
    key?: string | null;
    children?: Array<EducationItemDto> | null;
}