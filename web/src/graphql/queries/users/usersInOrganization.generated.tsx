import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import { UserFragmentFragmentDoc } from '../../fragments/user.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetUsersInOrnizationQueryVariables = Types.Exact<{
  organizationID: Types.Scalars['String'];
}>;


export type GetUsersInOrnizationQuery = { __typename?: 'Query', usersInOrganization: Array<{ __typename?: 'User', id: string, firstName?: Types.Maybe<string>, lastName?: Types.Maybe<string>, email: string, createdDate: any, updatedDate: any, roles: Array<{ __typename?: 'UserRole', name: string, id: number, organizationID: string }>, organizations?: Types.Maybe<Array<{ __typename?: 'Organization', name: string, id: string, businessID: string, businessField?: Types.Maybe<{ __typename?: 'BusinessField', name: string, id: number }>, industry?: Types.Maybe<{ __typename?: 'SubIndustry', id: number, nameEn: string, nameFi: string, code: string }>, municipality?: Types.Maybe<{ __typename?: 'Municipality', id: number, name: string, state: string, stateCode: number }> }>> }> };


export const GetUsersInOrnizationDocument = gql`
    query GetUsersInOrnization($organizationID: String!) {
  usersInOrganization(organizationID: $organizationID) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useGetUsersInOrnizationQuery__
 *
 * To run a query within a React component, call `useGetUsersInOrnizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersInOrnizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersInOrnizationQuery({
 *   variables: {
 *      organizationID: // value for 'organizationID'
 *   },
 * });
 */
export function useGetUsersInOrnizationQuery(baseOptions: Apollo.QueryHookOptions<GetUsersInOrnizationQuery, GetUsersInOrnizationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersInOrnizationQuery, GetUsersInOrnizationQueryVariables>(GetUsersInOrnizationDocument, options);
      }
export function useGetUsersInOrnizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersInOrnizationQuery, GetUsersInOrnizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersInOrnizationQuery, GetUsersInOrnizationQueryVariables>(GetUsersInOrnizationDocument, options);
        }
export type GetUsersInOrnizationQueryHookResult = ReturnType<typeof useGetUsersInOrnizationQuery>;
export type GetUsersInOrnizationLazyQueryHookResult = ReturnType<typeof useGetUsersInOrnizationLazyQuery>;
export type GetUsersInOrnizationQueryResult = Apollo.QueryResult<GetUsersInOrnizationQuery, GetUsersInOrnizationQueryVariables>;