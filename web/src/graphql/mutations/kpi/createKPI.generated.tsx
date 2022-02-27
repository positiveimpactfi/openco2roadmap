import * as Types from '../../../types/generatedTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateKpiMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
  measurementUnit?: Types.Maybe<Types.MeasurementUnitType>;
}>;


export type CreateKpiMutation = { __typename?: 'Mutation', createKPI: { __typename?: 'KPI', name: string } };


export const CreateKpiDocument = gql`
    mutation CreateKPI($name: String!, $measurementUnit: MeasurementUnitType) {
  createKPI(name: $name, measurementUnit: $measurementUnit) {
    name
  }
}
    `;
export type CreateKpiMutationFn = Apollo.MutationFunction<CreateKpiMutation, CreateKpiMutationVariables>;

/**
 * __useCreateKpiMutation__
 *
 * To run a mutation, you first call `useCreateKpiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateKpiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createKpiMutation, { data, loading, error }] = useCreateKpiMutation({
 *   variables: {
 *      name: // value for 'name'
 *      measurementUnit: // value for 'measurementUnit'
 *   },
 * });
 */
export function useCreateKpiMutation(baseOptions?: Apollo.MutationHookOptions<CreateKpiMutation, CreateKpiMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateKpiMutation, CreateKpiMutationVariables>(CreateKpiDocument, options);
      }
export type CreateKpiMutationHookResult = ReturnType<typeof useCreateKpiMutation>;
export type CreateKpiMutationResult = Apollo.MutationResult<CreateKpiMutation>;
export type CreateKpiMutationOptions = Apollo.BaseMutationOptions<CreateKpiMutation, CreateKpiMutationVariables>;