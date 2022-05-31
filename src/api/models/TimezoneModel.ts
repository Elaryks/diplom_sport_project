/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ActionTypes } from './ActionTypes';
import type { DomainEventBase } from './DomainEventBase';
import type { TimezoneModelTranslation } from './TimezoneModelTranslation';

export type TimezoneModel = {
    readonly text?: string | null;
    value?: number;
    readonly city?: string | null;
    translations?: Array<TimezoneModelTranslation> | null;
    content?: TimezoneModelTranslation;
    id?: number;
    events?: Array<DomainEventBase> | null;
    actionType?: ActionTypes;
}