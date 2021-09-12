import * as Types from '../../types';

import { gql } from '@apollo/client';
export type EmissionFactorFragmentFragment = { __typename?: 'EmissionFactor', id: string, name: string, source?: Types.Maybe<string>, values?: Types.Maybe<Array<{ __typename?: 'EmissionFactorValue', value: number, startDate: number, endDate: number }>>, physicalQuantity: { __typename?: 'PhysicalQuantity', name: string, baseUnit: { __typename?: 'MeasurementUnit', name: string, shorthand: string } } };

export const EmissionFactorFragmentFragmentDoc = gql`
    fragment EmissionFactorFragment on EmissionFactor {
  id
  name
  source
  values {
    value
    startDate
    endDate
  }
  physicalQuantity {
    name
    baseUnit {
      name
      shorthand
    }
  }
}
    `;