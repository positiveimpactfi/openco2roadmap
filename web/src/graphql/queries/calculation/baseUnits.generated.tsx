import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type BaseMeasurementUnitsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type BaseMeasurementUnitsQuery = { __typename?: 'Query', physicalQuantities: Array<{ __typename?: 'PhysicalQuantity', name: string, id: number, baseUnit: { __typename?: 'MeasurementUnit', id: number, name: string, shorthand: string, conversionFactor: number } }> };


export const BaseMeasurementUnitsDocument = gql`
    query BaseMeasurementUnits {
  physicalQuantities {
    name
    id
    baseUnit {
      id
      name
      shorthand
      conversionFactor
    }
  }
}
    `;

/**
 * __useBaseMeasurementUnitsQuery__
 *
 * To run a query within a React component, call `useBaseMeasurementUnitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBaseMeasurementUnitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBaseMeasurementUnitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBaseMeasurementUnitsQuery(baseOptions?: Apollo.QueryHookOptions<BaseMeasurementUnitsQuery, BaseMeasurementUnitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BaseMeasurementUnitsQuery, BaseMeasurementUnitsQueryVariables>(BaseMeasurementUnitsDocument, options);
      }
export function useBaseMeasurementUnitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BaseMeasurementUnitsQuery, BaseMeasurementUnitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BaseMeasurementUnitsQuery, BaseMeasurementUnitsQueryVariables>(BaseMeasurementUnitsDocument, options);
        }
export type BaseMeasurementUnitsQueryHookResult = ReturnType<typeof useBaseMeasurementUnitsQuery>;
export type BaseMeasurementUnitsLazyQueryHookResult = ReturnType<typeof useBaseMeasurementUnitsLazyQuery>;
export type BaseMeasurementUnitsQueryResult = Apollo.QueryResult<BaseMeasurementUnitsQuery, BaseMeasurementUnitsQueryVariables>;