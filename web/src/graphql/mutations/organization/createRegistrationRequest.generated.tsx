import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateRegistrationRequestMutationVariables = Types.Exact<{
  data: Types.RegistrationRequestInput;
}>;


export type CreateRegistrationRequestMutation = { __typename?: 'Mutation', createRegistrationRequest: { __typename?: 'RegistrationRequest', id: string } };


export const CreateRegistrationRequestDocument = gql`
    mutation CreateRegistrationRequest($data: RegistrationRequestInput!) {
  createRegistrationRequest(data: $data) {
    id
  }
}
    `;
export type CreateRegistrationRequestMutationFn = Apollo.MutationFunction<CreateRegistrationRequestMutation, CreateRegistrationRequestMutationVariables>;

/**
 * __useCreateRegistrationRequestMutation__
 *
 * To run a mutation, you first call `useCreateRegistrationRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRegistrationRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRegistrationRequestMutation, { data, loading, error }] = useCreateRegistrationRequestMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateRegistrationRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateRegistrationRequestMutation, CreateRegistrationRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRegistrationRequestMutation, CreateRegistrationRequestMutationVariables>(CreateRegistrationRequestDocument, options);
      }
export type CreateRegistrationRequestMutationHookResult = ReturnType<typeof useCreateRegistrationRequestMutation>;
export type CreateRegistrationRequestMutationResult = Apollo.MutationResult<CreateRegistrationRequestMutation>;
export type CreateRegistrationRequestMutationOptions = Apollo.BaseMutationOptions<CreateRegistrationRequestMutation, CreateRegistrationRequestMutationVariables>;