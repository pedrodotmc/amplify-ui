// Adapted from https://github.com/radix-ui/primitives/blob/main/packages/react/id/src/id.tsx#L8
import * as React from 'react';
import { useLayoutEffect } from './useLayoutEffect';

// Prefixed autogenerated id created by useStableId
export const AUTO_GENERATED_ID_PREFIX = 'amplify-id';

export type UseStableId = (id?: string) => string;

// Create a local version of React.useId which will reference React.useId for React 18
// and fallback to noop for React 17 and below
// @ts-ignore
const useReactId = 'useId' in React ? React.useId : () => undefined;
let count = 0;

/**
 * Create a uuid to use with amplify fields unless
 * an id is provided
 * @param id user specified id
 * @returns string
 */
export const useStableId: UseStableId = (id) => {
  const [stableId, setStableId] = React.useState<string | undefined>(
    useReactId()
  );

  // React versions older than 18 will have client-side ids only
  useLayoutEffect(() => {
    if (!id) setStableId((reactId) => reactId ?? String(count++));
  }, [id]);
  return id || (stableId ? `${AUTO_GENERATED_ID_PREFIX}-${stableId}` : '');
};
