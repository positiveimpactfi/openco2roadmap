import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import { UserFragmentFragmentDoc } from '../../fragments/user.generated';
import { OrganizationFragmentFragmentDoc } from '../../fragments/organization.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type MeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Types.Maybe<{ __typename?: 'User', id: string, firstName?: Types.Maybe<string>, lastName?: Types.Maybe<string>, email: string, createdDate: any, updatedDate: any, organizations?: Types.Maybe<Array<{ __typename?: 'Organization', name: string, id: string, businessID: string, businessField?: Types.Maybe<{ __typename?: 'BusinessField', name: string, id: number }>, industry?: Types.Maybe<{ __typename?: 'SubIndustry', id: number, nameEn: string, nameFi: string, code: string }>, municipality?: Types.Maybe<{ __typename?: 'Municipality', id: number, name: string, state: string, stateCode: number }> }>>, roles: Array<{ __typename?: 'UserRole', name: string, id: number, organizationID: string }> }> };


export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
    organizations {
      ...OrganizationFragment
    }
  }
}
    ${UserFragmentFragmentDoc}
${OrganizationFragmentFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;