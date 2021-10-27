import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import { EmissionFactorFragmentFragmentDoc } from '../../fragments/emissionFactor.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type MyEmissionFactorsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyEmissionFactorsQuery = { __typename?: 'Query', myEmissionFactors: Array<{ __typename?: 'EmissionFactor', id: string, name: string, source?: Types.Maybe<string>, dataSourceType: Types.DataSourceType, values?: Types.Maybe<Array<{ __typename?: 'EmissionFactorValue', id: string, value: number, startDate: number, endDate: number }>>, physicalQuantity: { __typename?: 'PhysicalQuantity', name: string, baseUnit: { __typename?: 'MeasurementUnit', name: string, shorthand: string } }, emissionSources: Array<{ __typename?: 'EmissionSource', id: number, name: string }> }> };


export const MyEmissionFactorsDocument = gql`
    query MyEmissionFactors {
  myEmissionFactors {
    ...EmissionFactorFragment
  }
}
    ${EmissionFactorFragmentFragmentDoc}`;

/**
 * __useMyEmissionFactorsQuery__
 *
 * To run a query within a React component, call `useMyEmissionFactorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyEmissionFactorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyEmissionFactorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyEmissionFactorsQuery(baseOptions?: Apollo.QueryHookOptions<MyEmissionFactorsQuery, MyEmissionFactorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyEmissionFactorsQuery, MyEmissionFactorsQueryVariables>(MyEmissionFactorsDocument, options);
      }
export function useMyEmissionFactorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyEmissionFactorsQuery, MyEmissionFactorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyEmissionFactorsQuery, MyEmissionFactorsQueryVariables>(MyEmissionFactorsDocument, options);
        }
export type MyEmissionFactorsQueryHookResult = ReturnType<typeof useMyEmissionFactorsQuery>;
export type MyEmissionFactorsLazyQueryHookResult = ReturnType<typeof useMyEmissionFactorsLazyQuery>;
export type MyEmissionFactorsQueryResult = Apollo.QueryResult<MyEmissionFactorsQuery, MyEmissionFactorsQueryVariables>;