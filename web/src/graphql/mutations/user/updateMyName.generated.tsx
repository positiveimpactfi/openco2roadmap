import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UpdateMyNameMutationVariables = Types.Exact<{
  newLastName?: Types.Maybe<Types.Scalars['String']>;
  newFirstName?: Types.Maybe<Types.Scalars['String']>;
}>;


export type UpdateMyNameMutation = { __typename?: 'Mutation', updateMyName: boolean };


export const UpdateMyNameDocument = gql`
    mutation UpdateMyName($newLastName: String, $newFirstName: String) {
  updateMyName(newLastName: $newLastName, newFirstName: $newFirstName)
}
    `;
export type UpdateMyNameMutationFn = Apollo.MutationFunction<UpdateMyNameMutation, UpdateMyNameMutationVariables>;

/**
 * __useUpdateMyNameMutation__
 *
 * To run a mutation, you first call `useUpdateMyNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMyNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMyNameMutation, { data, loading, error }] = useUpdateMyNameMutation({
 *   variables: {
 *      newLastName: // value for 'newLastName'
 *      newFirstName: // value for 'newFirstName'
 *   },
 * });
 */
export function useUpdateMyNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMyNameMutation, UpdateMyNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMyNameMutation, UpdateMyNameMutationVariables>(UpdateMyNameDocument, options);
      }
export type UpdateMyNameMutationHookResult = ReturnType<typeof useUpdateMyNameMutation>;
export type UpdateMyNameMutationResult = Apollo.MutationResult<UpdateMyNameMutation>;
export type UpdateMyNameMutationOptions = Apollo.BaseMutationOptions<UpdateMyNameMutation, UpdateMyNameMutationVariables>;