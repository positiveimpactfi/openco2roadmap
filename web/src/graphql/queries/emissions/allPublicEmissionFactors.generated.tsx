import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import { EmissionFactorFragmentFragmentDoc } from '../../fragments/emissionFactor.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AllPublicEmissionFactorsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllPublicEmissionFactorsQuery = { __typename?: 'Query', allPublicEmissionFactors: Array<{ __typename?: 'EmissionFactor', id: string, name: string, source?: Types.Maybe<string>, dataSourceType: Types.DataSourceType, values?: Types.Maybe<Array<{ __typename?: 'EmissionFactorValue', id: string, value: number, startDate: number, endDate: number }>>, physicalQuantity: { __typename?: 'PhysicalQuantity', name: string, baseUnit: { __typename?: 'MeasurementUnit', name: string, shorthand: string } }, emissionSources: Array<{ __typename?: 'EmissionSource', id: number, name: string }> }> };


export const AllPublicEmissionFactorsDocument = gql`
    query AllPublicEmissionFactors {
  allPublicEmissionFactors {
    ...EmissionFactorFragment
  }
}
    ${EmissionFactorFragmentFragmentDoc}`;

/**
 * __useAllPublicEmissionFactorsQuery__
 *
 * To run a query within a React component, call `useAllPublicEmissionFactorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPublicEmissionFactorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPublicEmissionFactorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPublicEmissionFactorsQuery(baseOptions?: Apollo.QueryHookOptions<AllPublicEmissionFactorsQuery, AllPublicEmissionFactorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPublicEmissionFactorsQuery, AllPublicEmissionFactorsQueryVariables>(AllPublicEmissionFactorsDocument, options);
      }
export function useAllPublicEmissionFactorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPublicEmissionFactorsQuery, AllPublicEmissionFactorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPublicEmissionFactorsQuery, AllPublicEmissionFactorsQueryVariables>(AllPublicEmissionFactorsDocument, options);
        }
export type AllPublicEmissionFactorsQueryHookResult = ReturnType<typeof useAllPublicEmissionFactorsQuery>;
export type AllPublicEmissionFactorsLazyQueryHookResult = ReturnType<typeof useAllPublicEmissionFactorsLazyQuery>;
export type AllPublicEmissionFactorsQueryResult = Apollo.QueryResult<AllPublicEmissionFactorsQuery, AllPublicEmissionFactorsQueryVariables>;