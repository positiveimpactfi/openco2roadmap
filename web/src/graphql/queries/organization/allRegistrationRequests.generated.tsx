import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AllRegistrationRequestsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllRegistrationRequestsQuery = { __typename?: 'Query', allRegistrationRequests: Array<{ __typename?: 'RegistrationRequest', firstName: string, lastName: string, email: string, businessID: string, municipality: { __typename?: 'Municipality', name: string }, businessField: { __typename?: 'BusinessField', name: string } }> };


export const AllRegistrationRequestsDocument = gql`
    query AllRegistrationRequests {
  allRegistrationRequests {
    firstName
    lastName
    email
    businessID
    municipality {
      name
    }
    businessField {
      name
    }
  }
}
    `;

/**
 * __useAllRegistrationRequestsQuery__
 *
 * To run a query within a React component, call `useAllRegistrationRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllRegistrationRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllRegistrationRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllRegistrationRequestsQuery(baseOptions?: Apollo.QueryHookOptions<AllRegistrationRequestsQuery, AllRegistrationRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllRegistrationRequestsQuery, AllRegistrationRequestsQueryVariables>(AllRegistrationRequestsDocument, options);
      }
export function useAllRegistrationRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllRegistrationRequestsQuery, AllRegistrationRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllRegistrationRequestsQuery, AllRegistrationRequestsQueryVariables>(AllRegistrationRequestsDocument, options);
        }
export type AllRegistrationRequestsQueryHookResult = ReturnType<typeof useAllRegistrationRequestsQuery>;
export type AllRegistrationRequestsLazyQueryHookResult = ReturnType<typeof useAllRegistrationRequestsLazyQuery>;
export type AllRegistrationRequestsQueryResult = Apollo.QueryResult<AllRegistrationRequestsQuery, AllRegistrationRequestsQueryVariables>;