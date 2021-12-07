import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type IntiveUserMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
  organizationID: Types.Scalars['String'];
  role: Types.Role;
}>;


export type IntiveUserMutation = { __typename?: 'Mutation', inviteUser: boolean };


export const IntiveUserDocument = gql`
    mutation IntiveUser($email: String!, $organizationID: String!, $role: Role!) {
  inviteUser(email: $email, organizationID: $organizationID, role: $role)
}
    `;
export type IntiveUserMutationFn = Apollo.MutationFunction<IntiveUserMutation, IntiveUserMutationVariables>;

/**
 * __useIntiveUserMutation__
 *
 * To run a mutation, you first call `useIntiveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIntiveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [intiveUserMutation, { data, loading, error }] = useIntiveUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      organizationID: // value for 'organizationID'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useIntiveUserMutation(baseOptions?: Apollo.MutationHookOptions<IntiveUserMutation, IntiveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IntiveUserMutation, IntiveUserMutationVariables>(IntiveUserDocument, options);
      }
export type IntiveUserMutationHookResult = ReturnType<typeof useIntiveUserMutation>;
export type IntiveUserMutationResult = Apollo.MutationResult<IntiveUserMutation>;
export type IntiveUserMutationOptions = Apollo.BaseMutationOptions<IntiveUserMutation, IntiveUserMutationVariables>;