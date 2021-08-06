import EndpointResult from '../types/EndpointResult';
import Result from '../types/Result';

export default function resultToEndpointResult<T>(
  result: Result<T>
): EndpointResult<T> {
  return {
    data: result.data,
    error: result.error ? result.error.message : undefined,
  };
}
