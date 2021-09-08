import * as Types from '../../types';

import { gql } from '@apollo/client';
export type MunicipalityFragmentFragment = { __typename?: 'Municipality', id: number, name: string, state: string, stateCode: number };

export const MunicipalityFragmentFragmentDoc = gql`
    fragment MunicipalityFragment on Municipality {
  id
  name
  state
  stateCode
}
    `;