import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UpdateSiteMutationVariables = Types.Exact<{
  siteID: Types.Scalars['String'];
  name?: Types.Maybe<Types.Scalars['String']>;
  municipalityID?: Types.Maybe<Types.Scalars['Int']>;
  siteTypeID?: Types.Maybe<Types.Scalars['String']>;
  siteUnits?: Types.Maybe<Array<Types.SiteUnitInput> | Types.SiteUnitInput>;
}>;


export type UpdateSiteMutation = { __typename?: 'Mutation', updateSite: { __typename?: 'Site', name: string, id: string, municipality?: Types.Maybe<{ __typename?: 'Municipality', name: string }>, siteType: { __typename?: 'SiteType', id: string, name: string } } };


export const UpdateSiteDocument = gql`
    mutation UpdateSite($siteID: String!, $name: String, $municipalityID: Int, $siteTypeID: String, $siteUnits: [SiteUnitInput!]) {
  updateSite(
    siteID: $siteID
    name: $name
    municipalityID: $municipalityID
    siteTypeID: $siteTypeID
    siteUnits: $siteUnits
  ) {
    name
    id
    municipality {
      name
    }
    siteType {
      id
      name
    }
  }
}
    `;
export type UpdateSiteMutationFn = Apollo.MutationFunction<UpdateSiteMutation, UpdateSiteMutationVariables>;

/**
 * __useUpdateSiteMutation__
 *
 * To run a mutation, you first call `useUpdateSiteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSiteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSiteMutation, { data, loading, error }] = useUpdateSiteMutation({
 *   variables: {
 *      siteID: // value for 'siteID'
 *      name: // value for 'name'
 *      municipalityID: // value for 'municipalityID'
 *      siteTypeID: // value for 'siteTypeID'
 *      siteUnits: // value for 'siteUnits'
 *   },
 * });
 */
export function useUpdateSiteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSiteMutation, UpdateSiteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSiteMutation, UpdateSiteMutationVariables>(UpdateSiteDocument, options);
      }
export type UpdateSiteMutationHookResult = ReturnType<typeof useUpdateSiteMutation>;
export type UpdateSiteMutationResult = Apollo.MutationResult<UpdateSiteMutation>;
export type UpdateSiteMutationOptions = Apollo.BaseMutationOptions<UpdateSiteMutation, UpdateSiteMutationVariables>;