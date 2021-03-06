import * as Types from '../../types/generatedTypes';

import { gql } from '@apollo/client';
import { MunicipalityFragmentFragmentDoc } from './municipality.generated';
export type OrganizationFragmentFragment = { __typename?: 'Organization', name: string, id: string, businessID: string, businessField?: Types.Maybe<{ __typename?: 'BusinessField', name: string, id: number }>, industry?: Types.Maybe<{ __typename?: 'SubIndustry', id: number, nameEn: string, nameFi: string, code: string }>, municipality?: Types.Maybe<{ __typename?: 'Municipality', id: number, name: string, state: string, stateCode: number }> };

export const OrganizationFragmentFragmentDoc = gql`
    fragment OrganizationFragment on Organization {
  name
  id
  businessField {
    name
    id
  }
  industry {
    id
    nameEn
    nameFi
    code
  }
  businessID
  municipality {
    ...MunicipalityFragment
  }
}
    ${MunicipalityFragmentFragmentDoc}`;