import * as Types from '../../../types';

import { gql } from '@apollo/client';
import { OrganizationFragmentFragmentDoc } from '../../fragments/organization.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AllOrganizationsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllOrganizationsQuery = { __typename?: 'Query', allOrganizations: Array<{ __typename?: 'Organization', name: string, id: string, businessID: string, businessField?: Types.Maybe<{ __typename?: 'BusinessField', name: string, id: number }>, municipality?: Types.Maybe<{ __typename?: 'Municipality', id: number, name: string, state: string, stateCode: number }> }> };


export const AllOrganizationsDocument = gql`
    query AllOrganizations {
  allOrganizations {
    ...OrganizationFragment
  }
}
    ${OrganizationFragmentFragmentDoc}`;

/**
 * __useAllOrganizationsQuery__
 *
 * To run a query within a React component, call `useAllOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllOrganizationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllOrganizationsQuery(baseOptions?: Apollo.QueryHookOptions<AllOrganizationsQuery, AllOrganizationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllOrganizationsQuery, AllOrganizationsQueryVariables>(AllOrganizationsDocument, options);
      }
export function useAllOrganizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllOrganizationsQuery, AllOrganizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllOrganizationsQuery, AllOrganizationsQueryVariables>(AllOrganizationsDocument, options);
        }
export type AllOrganizationsQueryHookResult = ReturnType<typeof useAllOrganizationsQuery>;
export type AllOrganizationsLazyQueryHookResult = ReturnType<typeof useAllOrganizationsLazyQuery>;
export type AllOrganizationsQueryResult = Apollo.QueryResult<AllOrganizationsQuery, AllOrganizationsQueryVariables>;