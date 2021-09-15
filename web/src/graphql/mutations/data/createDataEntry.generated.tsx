import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateDataEntryMutationVariables = Types.Exact<{
  consumptionValue: Types.Scalars['Float'];
  endDate: Types.Scalars['DateTime'];
  startDate: Types.Scalars['DateTime'];
  category: Types.CategoryType;
  measurementUnit: Types.MeasurementUnitType;
  emissionSource: Types.EmissionSourceType;
  emissionsFactorValueID: Types.Scalars['String'];
  siteUnitID: Types.Scalars['String'];
}>;


export type CreateDataEntryMutation = { __typename?: 'Mutation', createDataEntry: { __typename?: 'DataEntry', id: string, consumptionValue: number } };


export const CreateDataEntryDocument = gql`
    mutation CreateDataEntry($consumptionValue: Float!, $endDate: DateTime!, $startDate: DateTime!, $category: CategoryType!, $measurementUnit: MeasurementUnitType!, $emissionSource: EmissionSourceType!, $emissionsFactorValueID: String!, $siteUnitID: String!) {
  createDataEntry(
    consumptionValue: $consumptionValue
    emissionsFactorValueID: $emissionsFactorValueID
    emissionSource: $emissionSource
    category: $category
    measurementUnit: $measurementUnit
    siteUnitID: $siteUnitID
    startDate: $startDate
    endDate: $endDate
  ) {
    id
    consumptionValue
  }
}
    `;
export type CreateDataEntryMutationFn = Apollo.MutationFunction<CreateDataEntryMutation, CreateDataEntryMutationVariables>;

/**
 * __useCreateDataEntryMutation__
 *
 * To run a mutation, you first call `useCreateDataEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDataEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDataEntryMutation, { data, loading, error }] = useCreateDataEntryMutation({
 *   variables: {
 *      consumptionValue: // value for 'consumptionValue'
 *      endDate: // value for 'endDate'
 *      startDate: // value for 'startDate'
 *      category: // value for 'category'
 *      measurementUnit: // value for 'measurementUnit'
 *      emissionSource: // value for 'emissionSource'
 *      emissionsFactorValueID: // value for 'emissionsFactorValueID'
 *      siteUnitID: // value for 'siteUnitID'
 *   },
 * });
 */
export function useCreateDataEntryMutation(baseOptions?: Apollo.MutationHookOptions<CreateDataEntryMutation, CreateDataEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDataEntryMutation, CreateDataEntryMutationVariables>(CreateDataEntryDocument, options);
      }
export type CreateDataEntryMutationHookResult = ReturnType<typeof useCreateDataEntryMutation>;
export type CreateDataEntryMutationResult = Apollo.MutationResult<CreateDataEntryMutation>;
export type CreateDataEntryMutationOptions = Apollo.BaseMutationOptions<CreateDataEntryMutation, CreateDataEntryMutationVariables>;