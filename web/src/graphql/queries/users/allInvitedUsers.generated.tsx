import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AllInvitedUsersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllInvitedUsersQuery = { __typename?: 'Query', allInvitedUsers: Array<{ __typename?: 'InvitedUser', id: string, email: string, role: Types.Role, organization: { __typename?: 'Organization', name: string } }> };


export const AllInvitedUsersDocument = gql`
    query AllInvitedUsers {
  allInvitedUsers {
    id
    email
    organization {
      name
    }
    role
  }
}
    `;

/**
 * __useAllInvitedUsersQuery__
 *
 * To run a query within a React component, call `useAllInvitedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllInvitedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllInvitedUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllInvitedUsersQuery(baseOptions?: Apollo.QueryHookOptions<AllInvitedUsersQuery, AllInvitedUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllInvitedUsersQuery, AllInvitedUsersQueryVariables>(AllInvitedUsersDocument, options);
      }
export function useAllInvitedUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllInvitedUsersQuery, AllInvitedUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllInvitedUsersQuery, AllInvitedUsersQueryVariables>(AllInvitedUsersDocument, options);
        }
export type AllInvitedUsersQueryHookResult = ReturnType<typeof useAllInvitedUsersQuery>;
export type AllInvitedUsersLazyQueryHookResult = ReturnType<typeof useAllInvitedUsersLazyQuery>;
export type AllInvitedUsersQueryResult = Apollo.QueryResult<AllInvitedUsersQuery, AllInvitedUsersQueryVariables>;