import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateKpiValueMutationVariables = Types.Exact<{
  year: Types.Scalars['Int'];
  value: Types.Scalars['Float'];
  kpiID: Types.Scalars['String'];
}>;


export type CreateKpiValueMutation = { __typename?: 'Mutation', createKPIValue: { __typename?: 'KPIValue', id: string, value: number } };


export const CreateKpiValueDocument = gql`
    mutation CreateKPIValue($year: Int!, $value: Float!, $kpiID: String!) {
  createKPIValue(year: $year, kpiID: $kpiID, value: $value) {
    id
    value
  }
}
    `;
export type CreateKpiValueMutationFn = Apollo.MutationFunction<CreateKpiValueMutation, CreateKpiValueMutationVariables>;

/**
 * __useCreateKpiValueMutation__
 *
 * To run a mutation, you first call `useCreateKpiValueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateKpiValueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createKpiValueMutation, { data, loading, error }] = useCreateKpiValueMutation({
 *   variables: {
 *      year: // value for 'year'
 *      value: // value for 'value'
 *      kpiID: // value for 'kpiID'
 *   },
 * });
 */
export function useCreateKpiValueMutation(baseOptions?: Apollo.MutationHookOptions<CreateKpiValueMutation, CreateKpiValueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateKpiValueMutation, CreateKpiValueMutationVariables>(CreateKpiValueDocument, options);
      }
export type CreateKpiValueMutationHookResult = ReturnType<typeof useCreateKpiValueMutation>;
export type CreateKpiValueMutationResult = Apollo.MutationResult<CreateKpiValueMutation>;
export type CreateKpiValueMutationOptions = Apollo.BaseMutationOptions<CreateKpiValueMutation, CreateKpiValueMutationVariables>;