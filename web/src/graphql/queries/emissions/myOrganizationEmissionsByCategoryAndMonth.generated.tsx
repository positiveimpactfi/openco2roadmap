import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type MyOrganizationEmissionsByCategoryAndMonthQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyOrganizationEmissionsByCategoryAndMonthQuery = { __typename?: 'Query', myOrganizationEmissionsByCategoryAndMonth: Array<{ __typename?: 'MonthlyCalculationSummary', categoryid?: Types.Maybe<string>, year?: Types.Maybe<number>, monthlysums?: Types.Maybe<string> }> };


export const MyOrganizationEmissionsByCategoryAndMonthDocument = gql`
    query MyOrganizationEmissionsByCategoryAndMonth {
  myOrganizationEmissionsByCategoryAndMonth {
    categoryid
    year
    monthlysums
  }
}
    `;

/**
 * __useMyOrganizationEmissionsByCategoryAndMonthQuery__
 *
 * To run a query within a React component, call `useMyOrganizationEmissionsByCategoryAndMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyOrganizationEmissionsByCategoryAndMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyOrganizationEmissionsByCategoryAndMonthQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyOrganizationEmissionsByCategoryAndMonthQuery(baseOptions?: Apollo.QueryHookOptions<MyOrganizationEmissionsByCategoryAndMonthQuery, MyOrganizationEmissionsByCategoryAndMonthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyOrganizationEmissionsByCategoryAndMonthQuery, MyOrganizationEmissionsByCategoryAndMonthQueryVariables>(MyOrganizationEmissionsByCategoryAndMonthDocument, options);
      }
export function useMyOrganizationEmissionsByCategoryAndMonthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyOrganizationEmissionsByCategoryAndMonthQuery, MyOrganizationEmissionsByCategoryAndMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyOrganizationEmissionsByCategoryAndMonthQuery, MyOrganizationEmissionsByCategoryAndMonthQueryVariables>(MyOrganizationEmissionsByCategoryAndMonthDocument, options);
        }
export type MyOrganizationEmissionsByCategoryAndMonthQueryHookResult = ReturnType<typeof useMyOrganizationEmissionsByCategoryAndMonthQuery>;
export type MyOrganizationEmissionsByCategoryAndMonthLazyQueryHookResult = ReturnType<typeof useMyOrganizationEmissionsByCategoryAndMonthLazyQuery>;
export type MyOrganizationEmissionsByCategoryAndMonthQueryResult = Apollo.QueryResult<MyOrganizationEmissionsByCategoryAndMonthQuery, MyOrganizationEmissionsByCategoryAndMonthQueryVariables>;