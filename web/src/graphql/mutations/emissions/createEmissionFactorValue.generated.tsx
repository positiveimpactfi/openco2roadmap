import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateEmissionFactorValueMutationVariables = Types.Exact<{
  emissionFactorID: Types.Scalars['String'];
  value: Types.Scalars['Float'];
  startDate: Types.Scalars['Float'];
  endDate: Types.Scalars['Float'];
}>;


export type CreateEmissionFactorValueMutation = { __typename?: 'Mutation', createEmissionFactorValue: { __typename?: 'EmissionFactorValue', id: string, value: number, startDate: number, endDate: number, creator?: Types.Maybe<{ __typename?: 'Organization', name: string }> } };


export const CreateEmissionFactorValueDocument = gql`
    mutation CreateEmissionFactorValue($emissionFactorID: String!, $value: Float!, $startDate: Float!, $endDate: Float!) {
  createEmissionFactorValue(
    emissionFactorID: $emissionFactorID
    startDate: $startDate
    endDate: $endDate
    value: $value
  ) {
    id
    value
    startDate
    endDate
    creator {
      name
    }
  }
}
    `;
export type CreateEmissionFactorValueMutationFn = Apollo.MutationFunction<CreateEmissionFactorValueMutation, CreateEmissionFactorValueMutationVariables>;

/**
 * __useCreateEmissionFactorValueMutation__
 *
 * To run a mutation, you first call `useCreateEmissionFactorValueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEmissionFactorValueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEmissionFactorValueMutation, { data, loading, error }] = useCreateEmissionFactorValueMutation({
 *   variables: {
 *      emissionFactorID: // value for 'emissionFactorID'
 *      value: // value for 'value'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useCreateEmissionFactorValueMutation(baseOptions?: Apollo.MutationHookOptions<CreateEmissionFactorValueMutation, CreateEmissionFactorValueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEmissionFactorValueMutation, CreateEmissionFactorValueMutationVariables>(CreateEmissionFactorValueDocument, options);
      }
export type CreateEmissionFactorValueMutationHookResult = ReturnType<typeof useCreateEmissionFactorValueMutation>;
export type CreateEmissionFactorValueMutationResult = Apollo.MutationResult<CreateEmissionFactorValueMutation>;
export type CreateEmissionFactorValueMutationOptions = Apollo.BaseMutationOptions<CreateEmissionFactorValueMutation, CreateEmissionFactorValueMutationVariables>;