import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type MarkRegistrationRequestProcessedMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type MarkRegistrationRequestProcessedMutation = { __typename?: 'Mutation', markRequestProcessed: { __typename?: 'RegistrationRequest', id: string, processed: boolean } };


export const MarkRegistrationRequestProcessedDocument = gql`
    mutation MarkRegistrationRequestProcessed($id: String!) {
  markRequestProcessed(id: $id) {
    id
    processed
  }
}
    `;
export type MarkRegistrationRequestProcessedMutationFn = Apollo.MutationFunction<MarkRegistrationRequestProcessedMutation, MarkRegistrationRequestProcessedMutationVariables>;

/**
 * __useMarkRegistrationRequestProcessedMutation__
 *
 * To run a mutation, you first call `useMarkRegistrationRequestProcessedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkRegistrationRequestProcessedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markRegistrationRequestProcessedMutation, { data, loading, error }] = useMarkRegistrationRequestProcessedMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkRegistrationRequestProcessedMutation(baseOptions?: Apollo.MutationHookOptions<MarkRegistrationRequestProcessedMutation, MarkRegistrationRequestProcessedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkRegistrationRequestProcessedMutation, MarkRegistrationRequestProcessedMutationVariables>(MarkRegistrationRequestProcessedDocument, options);
      }
export type MarkRegistrationRequestProcessedMutationHookResult = ReturnType<typeof useMarkRegistrationRequestProcessedMutation>;
export type MarkRegistrationRequestProcessedMutationResult = Apollo.MutationResult<MarkRegistrationRequestProcessedMutation>;
export type MarkRegistrationRequestProcessedMutationOptions = Apollo.BaseMutationOptions<MarkRegistrationRequestProcessedMutation, MarkRegistrationRequestProcessedMutationVariables>;