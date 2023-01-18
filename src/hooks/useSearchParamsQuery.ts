import { useSearchParams } from 'react-router-dom';

export const useSearchParamsQuery = <T>() => {
  const [params] = useSearchParams();
  const paramsQuery = Object.fromEntries([...params]);

  return paramsQuery as T;
};
