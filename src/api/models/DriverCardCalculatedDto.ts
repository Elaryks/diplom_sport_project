/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DriverCardActionDto } from './DriverCardActionDto';

export type DriverCardCalculatedDto = {
    actions?: Array<DriverCardActionDto> | null;
    readonly isProceedAvailable?: boolean;
}