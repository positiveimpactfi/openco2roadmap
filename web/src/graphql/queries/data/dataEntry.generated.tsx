import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type MyDataEntriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyDataEntriesQuery = { __typename?: 'Query', myDataEntries: Array<{ __typename?: 'DataEntry', id: string, startDate: any, endDate: any, consumptionValue: number, measurementUnit: Types.MeasurementUnitType, emissionSource: Types.EmissionSourceType, category: Types.CategoryType, emissionFactorValue: { __typename?: 'EmissionFactorValue', value: number, startDate: number, endDate: number, id: string }, createdBy: { __typename?: 'User', id: string, email: string }, siteUnit: { __typename?: 'SiteUnit', name: string, site: { __typename?: 'Site', name: string } } }> };


export const MyDataEntriesDocument = gql`
    query MyDataEntries {
  myDataEntries {
    id
    startDate
    endDate
    consumptionValue
    measurementUnit
    emissionSource
    category
    emissionFactorValue {
      value
      startDate
      endDate
      id
    }
    createdBy {
      id
      email
    }
    siteUnit {
      name
      site {
        name
      }
    }
  }
}
    `;

/**
 * __useMyDataEntriesQuery__
 *
 * To run a query within a React component, call `useMyDataEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyDataEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyDataEntriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyDataEntriesQuery(baseOptions?: Apollo.QueryHookOptions<MyDataEntriesQuery, MyDataEntriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyDataEntriesQuery, MyDataEntriesQueryVariables>(MyDataEntriesDocument, options);
      }
export function useMyDataEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyDataEntriesQuery, MyDataEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyDataEntriesQuery, MyDataEntriesQueryVariables>(MyDataEntriesDocument, options);
        }
export type MyDataEntriesQueryHookResult = ReturnType<typeof useMyDataEntriesQuery>;
export type MyDataEntriesLazyQueryHookResult = ReturnType<typeof useMyDataEntriesLazyQuery>;
export type MyDataEntriesQueryResult = Apollo.QueryResult<MyDataEntriesQuery, MyDataEntriesQueryVariables>;