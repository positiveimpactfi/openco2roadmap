import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type DeleteKpiMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteKpiMutation = { __typename?: 'Mutation', deleteKPI: { __typename?: 'KPI', name: string } };


export const DeleteKpiDocument = gql`
    mutation DeleteKPI($id: String!) {
  deleteKPI(id: $id) {
    name
  }
}
    `;
export type DeleteKpiMutationFn = Apollo.MutationFunction<DeleteKpiMutation, DeleteKpiMutationVariables>;

/**
 * __useDeleteKpiMutation__
 *
 * To run a mutation, you first call `useDeleteKpiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteKpiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteKpiMutation, { data, loading, error }] = useDeleteKpiMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteKpiMutation(baseOptions?: Apollo.MutationHookOptions<DeleteKpiMutation, DeleteKpiMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteKpiMutation, DeleteKpiMutationVariables>(DeleteKpiDocument, options);
      }
export type DeleteKpiMutationHookResult = ReturnType<typeof useDeleteKpiMutation>;
export type DeleteKpiMutationResult = Apollo.MutationResult<DeleteKpiMutation>;
export type DeleteKpiMutationOptions = Apollo.BaseMutationOptions<DeleteKpiMutation, DeleteKpiMutationVariables>;