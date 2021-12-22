import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateEmissionFactorMutationVariables = Types.Exact<{
  value: Types.Scalars['Float'];
  endDate: Types.Scalars['Float'];
  startDate: Types.Scalars['Float'];
  dataSourceType?: Types.Maybe<Types.DataSourceType>;
  source?: Types.Maybe<Types.Scalars['String']>;
  physicalQuantityID: Types.Scalars['Float'];
  name: Types.Scalars['String'];
  emissionSourceIDs: Array<Types.Scalars['Int']> | Types.Scalars['Int'];
  geographicalCoverage?: Types.Maybe<Types.Scalars['String']>;
}>;


export type CreateEmissionFactorMutation = { __typename?: 'Mutation', createEmissionFactor: { __typename?: 'EmissionFactor', id: string, name: string, source?: Types.Maybe<string>, dataSourceType: Types.DataSourceType, geographicalArea?: Types.Maybe<string>, values?: Types.Maybe<Array<{ __typename?: 'EmissionFactorValue', id: string, value: number, startDate: number, endDate: number }>>, physicalQuantity: { __typename?: 'PhysicalQuantity', name: string, baseUnit: { __typename?: 'MeasurementUnit', name: string, shorthand: string } } } };


export const CreateEmissionFactorDocument = gql`
    mutation CreateEmissionFactor($value: Float!, $endDate: Float!, $startDate: Float!, $dataSourceType: DataSourceType, $source: String, $physicalQuantityID: Float!, $name: String!, $emissionSourceIDs: [Int!]!, $geographicalCoverage: String) {
  createEmissionFactor(
    source: $source
    physicalQuantityID: $physicalQuantityID
    name: $name
    emissionSourceIDs: $emissionSourceIDs
    value: $value
    startDate: $startDate
    endDate: $endDate
    geographicalCoverage: $geographicalCoverage
    dataSourceType: $dataSourceType
  ) {
    id
    name
    source
    dataSourceType
    geographicalArea
    values {
      id
      value
      startDate
      endDate
    }
    physicalQuantity {
      name
      baseUnit {
        name
        shorthand
      }
    }
  }
}
    `;
export type CreateEmissionFactorMutationFn = Apollo.MutationFunction<CreateEmissionFactorMutation, CreateEmissionFactorMutationVariables>;

/**
 * __useCreateEmissionFactorMutation__
 *
 * To run a mutation, you first call `useCreateEmissionFactorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEmissionFactorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEmissionFactorMutation, { data, loading, error }] = useCreateEmissionFactorMutation({
 *   variables: {
 *      value: // value for 'value'
 *      endDate: // value for 'endDate'
 *      startDate: // value for 'startDate'
 *      dataSourceType: // value for 'dataSourceType'
 *      source: // value for 'source'
 *      physicalQuantityID: // value for 'physicalQuantityID'
 *      name: // value for 'name'
 *      emissionSourceIDs: // value for 'emissionSourceIDs'
 *      geographicalCoverage: // value for 'geographicalCoverage'
 *   },
 * });
 */
export function useCreateEmissionFactorMutation(baseOptions?: Apollo.MutationHookOptions<CreateEmissionFactorMutation, CreateEmissionFactorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEmissionFactorMutation, CreateEmissionFactorMutationVariables>(CreateEmissionFactorDocument, options);
      }
export type CreateEmissionFactorMutationHookResult = ReturnType<typeof useCreateEmissionFactorMutation>;
export type CreateEmissionFactorMutationResult = Apollo.MutationResult<CreateEmissionFactorMutation>;
export type CreateEmissionFactorMutationOptions = Apollo.BaseMutationOptions<CreateEmissionFactorMutation, CreateEmissionFactorMutationVariables>;