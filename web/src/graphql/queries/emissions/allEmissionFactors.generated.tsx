import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import { EmissionFactorFragmentFragmentDoc } from '../../fragments/emissionFactor.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AllEmissionFactorsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllEmissionFactorsQuery = { __typename?: 'Query', allEmissionFactors: Array<{ __typename?: 'EmissionFactor', id: string, name: string, source?: Types.Maybe<string>, dataSourceType: Types.DataSourceType, geographicalArea?: Types.Maybe<string>, creator?: Types.Maybe<{ __typename?: 'Organization', name: string }>, values?: Types.Maybe<Array<{ __typename?: 'EmissionFactorValue', id: string, value: number, startDate: number, endDate: number }>>, physicalQuantity: { __typename?: 'PhysicalQuantity', name: string, baseUnit: { __typename?: 'MeasurementUnit', name: string, shorthand: string } }, emissionSources: Array<{ __typename?: 'EmissionSource', id: number, name: string }> }> };


export const AllEmissionFactorsDocument = gql`
    query AllEmissionFactors {
  allEmissionFactors {
    creator {
      name
    }
    ...EmissionFactorFragment
  }
}
    ${EmissionFactorFragmentFragmentDoc}`;

/**
 * __useAllEmissionFactorsQuery__
 *
 * To run a query within a React component, call `useAllEmissionFactorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllEmissionFactorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllEmissionFactorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllEmissionFactorsQuery(baseOptions?: Apollo.QueryHookOptions<AllEmissionFactorsQuery, AllEmissionFactorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllEmissionFactorsQuery, AllEmissionFactorsQueryVariables>(AllEmissionFactorsDocument, options);
      }
export function useAllEmissionFactorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllEmissionFactorsQuery, AllEmissionFactorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllEmissionFactorsQuery, AllEmissionFactorsQueryVariables>(AllEmissionFactorsDocument, options);
        }
export type AllEmissionFactorsQueryHookResult = ReturnType<typeof useAllEmissionFactorsQuery>;
export type AllEmissionFactorsLazyQueryHookResult = ReturnType<typeof useAllEmissionFactorsLazyQuery>;
export type AllEmissionFactorsQueryResult = Apollo.QueryResult<AllEmissionFactorsQuery, AllEmissionFactorsQueryVariables>;