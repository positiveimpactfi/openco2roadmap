import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type MyOrganizationEmissionsByCategoryAndYearQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyOrganizationEmissionsByCategoryAndYearQuery = { __typename?: 'Query', myOrganizationEmissionsByCategoryAndYear: Array<{ __typename?: 'CalculationSummary', categoryid?: Types.Maybe<string>, yearlysums?: Types.Maybe<string> }> };


export const MyOrganizationEmissionsByCategoryAndYearDocument = gql`
    query MyOrganizationEmissionsByCategoryAndYear {
  myOrganizationEmissionsByCategoryAndYear {
    categoryid
    yearlysums
  }
}
    `;

/**
 * __useMyOrganizationEmissionsByCategoryAndYearQuery__
 *
 * To run a query within a React component, call `useMyOrganizationEmissionsByCategoryAndYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyOrganizationEmissionsByCategoryAndYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyOrganizationEmissionsByCategoryAndYearQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyOrganizationEmissionsByCategoryAndYearQuery(baseOptions?: Apollo.QueryHookOptions<MyOrganizationEmissionsByCategoryAndYearQuery, MyOrganizationEmissionsByCategoryAndYearQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyOrganizationEmissionsByCategoryAndYearQuery, MyOrganizationEmissionsByCategoryAndYearQueryVariables>(MyOrganizationEmissionsByCategoryAndYearDocument, options);
      }
export function useMyOrganizationEmissionsByCategoryAndYearLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyOrganizationEmissionsByCategoryAndYearQuery, MyOrganizationEmissionsByCategoryAndYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyOrganizationEmissionsByCategoryAndYearQuery, MyOrganizationEmissionsByCategoryAndYearQueryVariables>(MyOrganizationEmissionsByCategoryAndYearDocument, options);
        }
export type MyOrganizationEmissionsByCategoryAndYearQueryHookResult = ReturnType<typeof useMyOrganizationEmissionsByCategoryAndYearQuery>;
export type MyOrganizationEmissionsByCategoryAndYearLazyQueryHookResult = ReturnType<typeof useMyOrganizationEmissionsByCategoryAndYearLazyQuery>;
export type MyOrganizationEmissionsByCategoryAndYearQueryResult = Apollo.QueryResult<MyOrganizationEmissionsByCategoryAndYearQuery, MyOrganizationEmissionsByCategoryAndYearQueryVariables>;