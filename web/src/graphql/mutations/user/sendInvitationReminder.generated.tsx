import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type SendInvitationReminderMutationVariables = Types.Exact<{
  token: Types.Scalars['String'];
}>;


export type SendInvitationReminderMutation = { __typename?: 'Mutation', sendInvitationReminder: boolean };


export const SendInvitationReminderDocument = gql`
    mutation SendInvitationReminder($token: String!) {
  sendInvitationReminder(token: $token)
}
    `;
export type SendInvitationReminderMutationFn = Apollo.MutationFunction<SendInvitationReminderMutation, SendInvitationReminderMutationVariables>;

/**
 * __useSendInvitationReminderMutation__
 *
 * To run a mutation, you first call `useSendInvitationReminderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendInvitationReminderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendInvitationReminderMutation, { data, loading, error }] = useSendInvitationReminderMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useSendInvitationReminderMutation(baseOptions?: Apollo.MutationHookOptions<SendInvitationReminderMutation, SendInvitationReminderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendInvitationReminderMutation, SendInvitationReminderMutationVariables>(SendInvitationReminderDocument, options);
      }
export type SendInvitationReminderMutationHookResult = ReturnType<typeof useSendInvitationReminderMutation>;
export type SendInvitationReminderMutationResult = Apollo.MutationResult<SendInvitationReminderMutation>;
export type SendInvitationReminderMutationOptions = Apollo.BaseMutationOptions<SendInvitationReminderMutation, SendInvitationReminderMutationVariables>;