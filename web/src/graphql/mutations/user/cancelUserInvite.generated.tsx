import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CancelUserInviteMutationVariables = Types.Exact<{
  token: Types.Scalars['String'];
}>;


export type CancelUserInviteMutation = { __typename?: 'Mutation', cancelUserInvite: boolean };


export const CancelUserInviteDocument = gql`
    mutation CancelUserInvite($token: String!) {
  cancelUserInvite(token: $token)
}
    `;
export type CancelUserInviteMutationFn = Apollo.MutationFunction<CancelUserInviteMutation, CancelUserInviteMutationVariables>;

/**
 * __useCancelUserInviteMutation__
 *
 * To run a mutation, you first call `useCancelUserInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelUserInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelUserInviteMutation, { data, loading, error }] = useCancelUserInviteMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useCancelUserInviteMutation(baseOptions?: Apollo.MutationHookOptions<CancelUserInviteMutation, CancelUserInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelUserInviteMutation, CancelUserInviteMutationVariables>(CancelUserInviteDocument, options);
      }
export type CancelUserInviteMutationHookResult = ReturnType<typeof useCancelUserInviteMutation>;
export type CancelUserInviteMutationResult = Apollo.MutationResult<CancelUserInviteMutation>;
export type CancelUserInviteMutationOptions = Apollo.BaseMutationOptions<CancelUserInviteMutation, CancelUserInviteMutationVariables>;