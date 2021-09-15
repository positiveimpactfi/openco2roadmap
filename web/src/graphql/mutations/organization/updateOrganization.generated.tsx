import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UpdateOrganizationMutationVariables = Types.Exact<{
  organizationID: Types.Scalars['String'];
  newData: Types.EditOrganizationInput;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization: { __typename?: 'Organization', id: string, name: string, businessID: string, businessField?: Types.Maybe<{ __typename?: 'BusinessField', id: number, name: string }>, municipality?: Types.Maybe<{ __typename?: 'Municipality', name: string, state: string }> } };


export const UpdateOrganizationDocument = gql`
    mutation UpdateOrganization($organizationID: String!, $newData: EditOrganizationInput!) {
  updateOrganization(organizationID: $organizationID, newData: $newData) {
    id
    name
    businessID
    businessField {
      id
      name
    }
    municipality {
      name
      state
    }
  }
}
    `;
export type UpdateOrganizationMutationFn = Apollo.MutationFunction<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;

/**
 * __useUpdateOrganizationMutation__
 *
 * To run a mutation, you first call `useUpdateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrganizationMutation, { data, loading, error }] = useUpdateOrganizationMutation({
 *   variables: {
 *      organizationID: // value for 'organizationID'
 *      newData: // value for 'newData'
 *   },
 * });
 */
export function useUpdateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>(UpdateOrganizationDocument, options);
      }
export type UpdateOrganizationMutationHookResult = ReturnType<typeof useUpdateOrganizationMutation>;
export type UpdateOrganizationMutationResult = Apollo.MutationResult<UpdateOrganizationMutation>;
export type UpdateOrganizationMutationOptions = Apollo.BaseMutationOptions<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;