import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type MyOrganizationUsersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyOrganizationUsersQuery = { __typename?: 'Query', myOrganizationUsers: Array<{ __typename?: 'User', id: string, firstName?: Types.Maybe<string>, lastName?: Types.Maybe<string>, email: string }> };


export const MyOrganizationUsersDocument = gql`
    query MyOrganizationUsers {
  myOrganizationUsers {
    id
    firstName
    lastName
    email
  }
}
    `;

/**
 * __useMyOrganizationUsersQuery__
 *
 * To run a query within a React component, call `useMyOrganizationUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyOrganizationUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyOrganizationUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyOrganizationUsersQuery(baseOptions?: Apollo.QueryHookOptions<MyOrganizationUsersQuery, MyOrganizationUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyOrganizationUsersQuery, MyOrganizationUsersQueryVariables>(MyOrganizationUsersDocument, options);
      }
export function useMyOrganizationUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyOrganizationUsersQuery, MyOrganizationUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyOrganizationUsersQuery, MyOrganizationUsersQueryVariables>(MyOrganizationUsersDocument, options);
        }
export type MyOrganizationUsersQueryHookResult = ReturnType<typeof useMyOrganizationUsersQuery>;
export type MyOrganizationUsersLazyQueryHookResult = ReturnType<typeof useMyOrganizationUsersLazyQuery>;
export type MyOrganizationUsersQueryResult = Apollo.QueryResult<MyOrganizationUsersQuery, MyOrganizationUsersQueryVariables>;