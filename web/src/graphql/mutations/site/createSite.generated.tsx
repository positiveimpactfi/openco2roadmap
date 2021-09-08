import * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateSiteMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
  siteTypeID: Types.Scalars['String'];
  municipalityID: Types.Scalars['Int'];
}>;


export type CreateSiteMutation = { __typename?: 'Mutation', createSite: { __typename?: 'Site', id: string, name: string, siteUnits?: Types.Maybe<Array<{ __typename?: 'SiteUnit', name: string }>>, siteType: { __typename?: 'SiteType', name: string } } };


export const CreateSiteDocument = gql`
    mutation CreateSite($name: String!, $siteTypeID: String!, $municipalityID: Int!) {
  createSite(
    name: $name
    siteTypeID: $siteTypeID
    municipalityID: $municipalityID
  ) {
    id
    name
    siteUnits {
      name
    }
    siteType {
      name
    }
  }
}
    `;
export type CreateSiteMutationFn = Apollo.MutationFunction<CreateSiteMutation, CreateSiteMutationVariables>;

/**
 * __useCreateSiteMutation__
 *
 * To run a mutation, you first call `useCreateSiteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSiteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSiteMutation, { data, loading, error }] = useCreateSiteMutation({
 *   variables: {
 *      name: // value for 'name'
 *      siteTypeID: // value for 'siteTypeID'
 *      municipalityID: // value for 'municipalityID'
 *   },
 * });
 */
export function useCreateSiteMutation(baseOptions?: Apollo.MutationHookOptions<CreateSiteMutation, CreateSiteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSiteMutation, CreateSiteMutationVariables>(CreateSiteDocument, options);
      }
export type CreateSiteMutationHookResult = ReturnType<typeof useCreateSiteMutation>;
export type CreateSiteMutationResult = Apollo.MutationResult<CreateSiteMutation>;
export type CreateSiteMutationOptions = Apollo.BaseMutationOptions<CreateSiteMutation, CreateSiteMutationVariables>;