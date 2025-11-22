/**
 * Handles and formats Fetch errors from API responses
 * Primarily extracts error messages from the response data
 *
 * @param {Error} error - The caught error (expected to be Fetch Error)
 * @returns {string} The error message from the response
 * @throws {string} The extracted error message
 *
 * @example
 * try {
 *   // API call
 * } catch (error) {
 *   const message = formatedErrorServices(error);
 *   // message contains the server error detail
 * }
 */
export const formatedErrorServices = (error: unknown): string => {
  if (typeof error === 'string') {
    throw error;
  }
  
  const messageClient = (error as Error).message || 'Error: An unknown error occurred';
  throw messageClient;
};