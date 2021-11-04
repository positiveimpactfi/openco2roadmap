import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UpdateDataEntryMutationVariables = Types.Exact<{
  consumptionValue?: Types.Maybe<Types.Scalars['Float']>;
  endDate?: Types.Maybe<Types.Scalars['DateTime']>;
  startDate?: Types.Maybe<Types.Scalars['DateTime']>;
  category?: Types.Maybe<Types.CategoryType>;
  measurementUnit?: Types.Maybe<Types.MeasurementUnitType>;
  emissionSource?: Types.Maybe<Types.EmissionSourceType>;
  emissionsFactorValueID?: Types.Maybe<Types.Scalars['String']>;
  siteUnitID?: Types.Maybe<Types.Scalars['String']>;
  dataEntryID: Types.Scalars['String'];
}>;


export type UpdateDataEntryMutation = { __typename?: 'Mutation', updateDataEntry: { __typename?: 'DataEntry', id: string } };


export const UpdateDataEntryDocument = gql`
    mutation UpdateDataEntry($consumptionValue: Float, $endDate: DateTime, $startDate: DateTime, $category: CategoryType, $measurementUnit: MeasurementUnitType, $emissionSource: EmissionSourceType, $emissionsFactorValueID: String, $siteUnitID: String, $dataEntryID: String!) {
  updateDataEntry(
    consumptionValue: $consumptionValue
    endDate: $endDate
    startDate: $startDate
    category: $category
    measurementUnit: $measurementUnit
    emissionSource: $emissionSource
    emissionsFactorValueID: $emissionsFactorValueID
    siteUnitID: $siteUnitID
    dataEntryID: $dataEntryID
  ) {
    id
  }
}
    `;
export type UpdateDataEntryMutationFn = Apollo.MutationFunction<UpdateDataEntryMutation, UpdateDataEntryMutationVariables>;

/**
 * __useUpdateDataEntryMutation__
 *
 * To run a mutation, you first call `useUpdateDataEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDataEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDataEntryMutation, { data, loading, error }] = useUpdateDataEntryMutation({
 *   variables: {
 *      consumptionValue: // value for 'consumptionValue'
 *      endDate: // value for 'endDate'
 *      startDate: // value for 'startDate'
 *      category: // value for 'category'
 *      measurementUnit: // value for 'measurementUnit'
 *      emissionSource: // value for 'emissionSource'
 *      emissionsFactorValueID: // value for 'emissionsFactorValueID'
 *      siteUnitID: // value for 'siteUnitID'
 *      dataEntryID: // value for 'dataEntryID'
 *   },
 * });
 */
export function useUpdateDataEntryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDataEntryMutation, UpdateDataEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDataEntryMutation, UpdateDataEntryMutationVariables>(UpdateDataEntryDocument, options);
      }
export type UpdateDataEntryMutationHookResult = ReturnType<typeof useUpdateDataEntryMutation>;
export type UpdateDataEntryMutationResult = Apollo.MutationResult<UpdateDataEntryMutation>;
export type UpdateDataEntryMutationOptions = Apollo.BaseMutationOptions<UpdateDataEntryMutation, UpdateDataEntryMutationVariables>;