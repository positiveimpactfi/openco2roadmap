import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type MyOrganizationDataEntriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyOrganizationDataEntriesQuery = { __typename?: 'Query', myOrganizationDataEntries: Array<{ __typename?: 'DataEntry', id: string, startDate: any, endDate: any, consumptionValue: number, measurementUnit: Types.MeasurementUnitType, emissionSource: Types.EmissionSourceType, category: Types.CategoryType, emissionFactorValue: { __typename?: 'EmissionFactorValue', value: number, startDate: number, endDate: number, id: string, emissionFactor: { __typename?: 'EmissionFactor', name: string, id: string } }, createdBy: { __typename?: 'User', id: string, email: string }, siteUnit: { __typename?: 'SiteUnit', id: string, name: string, site: { __typename?: 'Site', name: string } } }> };


export const MyOrganizationDataEntriesDocument = gql`
    query MyOrganizationDataEntries {
  myOrganizationDataEntries {
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
      emissionFactor {
        name
        id
      }
    }
    createdBy {
      id
      email
    }
    siteUnit {
      id
      name
      site {
        name
      }
    }
  }
}
    `;

/**
 * __useMyOrganizationDataEntriesQuery__
 *
 * To run a query within a React component, call `useMyOrganizationDataEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyOrganizationDataEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyOrganizationDataEntriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyOrganizationDataEntriesQuery(baseOptions?: Apollo.QueryHookOptions<MyOrganizationDataEntriesQuery, MyOrganizationDataEntriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyOrganizationDataEntriesQuery, MyOrganizationDataEntriesQueryVariables>(MyOrganizationDataEntriesDocument, options);
      }
export function useMyOrganizationDataEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyOrganizationDataEntriesQuery, MyOrganizationDataEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyOrganizationDataEntriesQuery, MyOrganizationDataEntriesQueryVariables>(MyOrganizationDataEntriesDocument, options);
        }
export type MyOrganizationDataEntriesQueryHookResult = ReturnType<typeof useMyOrganizationDataEntriesQuery>;
export type MyOrganizationDataEntriesLazyQueryHookResult = ReturnType<typeof useMyOrganizationDataEntriesLazyQuery>;
export type MyOrganizationDataEntriesQueryResult = Apollo.QueryResult<MyOrganizationDataEntriesQuery, MyOrganizationDataEntriesQueryVariables>;