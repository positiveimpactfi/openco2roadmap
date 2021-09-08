import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateSiteTypeMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type CreateSiteTypeMutation = { __typename?: 'Mutation', createSiteType: { __typename?: 'SiteType', id: string, name: string, organization: { __typename?: 'Organization', name: string, id: string } } };


export const CreateSiteTypeDocument = gql`
    mutation CreateSiteType($name: String!) {
  createSiteType(name: $name) {
    id
    name
    organization {
      name
      id
    }
  }
}
    `;
export type CreateSiteTypeMutationFn = Apollo.MutationFunction<CreateSiteTypeMutation, CreateSiteTypeMutationVariables>;

/**
 * __useCreateSiteTypeMutation__
 *
 * To run a mutation, you first call `useCreateSiteTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSiteTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSiteTypeMutation, { data, loading, error }] = useCreateSiteTypeMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateSiteTypeMutation(baseOptions?: Apollo.MutationHookOptions<CreateSiteTypeMutation, CreateSiteTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSiteTypeMutation, CreateSiteTypeMutationVariables>(CreateSiteTypeDocument, options);
      }
export type CreateSiteTypeMutationHookResult = ReturnType<typeof useCreateSiteTypeMutation>;
export type CreateSiteTypeMutationResult = Apollo.MutationResult<CreateSiteTypeMutation>;
export type CreateSiteTypeMutationOptions = Apollo.BaseMutationOptions<CreateSiteTypeMutation, CreateSiteTypeMutationVariables>;