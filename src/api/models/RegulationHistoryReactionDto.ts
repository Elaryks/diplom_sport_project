/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDto } from './UserDto';

export type RegulationHistoryReactionDto = {
    id?: number;
    historyId?: number;
    value?: string | null;
    userId?: number;
    user?: UserDto;
}