'use client';

import { toast } from 'sonner';
import { useState } from 'react';

// Generic types for the hook:
// T - Input data type
// U - Return data type
interface UseSubmitProps<T, U> {
  data: T;
  callback: (data: T, id?: string) => Promise<U>;
}

/**
 * A reusable submission hook with loading state and error handling
 * @param msg Optional success message (falls back to callback result)
 */
const useSubmit = <T, U>(msg?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Main submission handler
  const doSubmit = async ({
    data,
    callback,
    id,
  }: UseSubmitProps<T, U> & { id?: string }) => {
    try {
      setIsLoading(true);
      const result = await callback(data, id);

      // Show success feedback
      if (msg) {
        toast.success(msg);
      } else if (typeof result === 'string') {
        toast.success(result);
      }
      return result;
    } catch (error) {
      // Show and store error
      const err = error as string;
      toast.error(err);
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    setError,
    doSubmit,
  };
};

export default useSubmit;
