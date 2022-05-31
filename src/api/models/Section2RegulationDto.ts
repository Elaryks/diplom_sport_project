/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RegulationDto } from './RegulationDto';

export type Section2RegulationDto = {
    id?: number;
    sectionId?: number;
    regulationId?: number;
    regulation?: RegulationDto;
    order?: number;
}