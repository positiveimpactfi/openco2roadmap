import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type MyOrganizationKpiValuesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyOrganizationKpiValuesQuery = { __typename?: 'Query', myOrganizationKPIs: Array<{ __typename?: 'KPI', id: string, name: string, organization?: Types.Maybe<{ __typename?: 'Organization', name: string }>, values?: Types.Maybe<Array<{ __typename?: 'KPIValue', value: number, year: number, organization?: Types.Maybe<{ __typename?: 'Organization', name: string }> }>>, unit?: Types.Maybe<{ __typename?: 'MeasurementUnit', name: string, shorthand: string }> }> };


export const MyOrganizationKpiValuesDocument = gql`
    query MyOrganizationKPIValues {
  myOrganizationKPIs {
    id
    name
    organization {
      name
    }
    values {
      value
      year
      organization {
        name
      }
    }
    unit {
      name
      shorthand
    }
  }
}
    `;

/**
 * __useMyOrganizationKpiValuesQuery__
 *
 * To run a query within a React component, call `useMyOrganizationKpiValuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyOrganizationKpiValuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyOrganizationKpiValuesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyOrganizationKpiValuesQuery(baseOptions?: Apollo.QueryHookOptions<MyOrganizationKpiValuesQuery, MyOrganizationKpiValuesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyOrganizationKpiValuesQuery, MyOrganizationKpiValuesQueryVariables>(MyOrganizationKpiValuesDocument, options);
      }
export function useMyOrganizationKpiValuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyOrganizationKpiValuesQuery, MyOrganizationKpiValuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyOrganizationKpiValuesQuery, MyOrganizationKpiValuesQueryVariables>(MyOrganizationKpiValuesDocument, options);
        }
export type MyOrganizationKpiValuesQueryHookResult = ReturnType<typeof useMyOrganizationKpiValuesQuery>;
export type MyOrganizationKpiValuesLazyQueryHookResult = ReturnType<typeof useMyOrganizationKpiValuesLazyQuery>;
export type MyOrganizationKpiValuesQueryResult = Apollo.QueryResult<MyOrganizationKpiValuesQuery, MyOrganizationKpiValuesQueryVariables>;