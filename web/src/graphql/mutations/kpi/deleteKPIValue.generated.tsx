import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type DeleteKpiValueMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteKpiValueMutation = { __typename?: 'Mutation', deleteKPIValue: { __typename?: 'KPIValue', value: number } };


export const DeleteKpiValueDocument = gql`
    mutation DeleteKPIValue($id: String!) {
  deleteKPIValue(id: $id) {
    value
  }
}
    `;
export type DeleteKpiValueMutationFn = Apollo.MutationFunction<DeleteKpiValueMutation, DeleteKpiValueMutationVariables>;

/**
 * __useDeleteKpiValueMutation__
 *
 * To run a mutation, you first call `useDeleteKpiValueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteKpiValueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteKpiValueMutation, { data, loading, error }] = useDeleteKpiValueMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteKpiValueMutation(baseOptions?: Apollo.MutationHookOptions<DeleteKpiValueMutation, DeleteKpiValueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteKpiValueMutation, DeleteKpiValueMutationVariables>(DeleteKpiValueDocument, options);
      }
export type DeleteKpiValueMutationHookResult = ReturnType<typeof useDeleteKpiValueMutation>;
export type DeleteKpiValueMutationResult = Apollo.MutationResult<DeleteKpiValueMutation>;
export type DeleteKpiValueMutationOptions = Apollo.BaseMutationOptions<DeleteKpiValueMutation, DeleteKpiValueMutationVariables>;