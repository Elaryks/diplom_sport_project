/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ActionTypes } from './ActionTypes';
import type { DomainEventBase } from './DomainEventBase';

export type TimezoneModelTranslation = {
    city?: string | null;
    baseEntityId?: number;
    cultureKey?: string | null;
    id?: number;
    events?: Array<DomainEventBase> | null;
    actionType?: ActionTypes;
}