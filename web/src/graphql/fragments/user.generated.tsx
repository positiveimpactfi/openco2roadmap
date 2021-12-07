import * as Types from '../../types/generatedTypes';

import { gql } from '@apollo/client';
import { OrganizationFragmentFragmentDoc } from './organization.generated';
export type UserFragmentFragment = { __typename?: 'User', id: string, firstName?: Types.Maybe<string>, lastName?: Types.Maybe<string>, email: string, createdDate: any, updatedDate: any, roles: Array<{ __typename?: 'UserRole', name: string, id: number, organizationID: string }>, organizations?: Types.Maybe<Array<{ __typename?: 'Organization', name: string, id: string, businessID: string, businessField?: Types.Maybe<{ __typename?: 'BusinessField', name: string, id: number }>, municipality?: Types.Maybe<{ __typename?: 'Municipality', id: number, name: string, state: string, stateCode: number }> }>> };

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  firstName
  lastName
  email
  roles {
    name
    id
    organizationID
  }
  organizations {
    ...OrganizationFragment
  }
  createdDate
  updatedDate
}
    ${OrganizationFragmentFragmentDoc}`;