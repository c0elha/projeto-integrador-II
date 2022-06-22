import { getAPIClient } from './axios';

var softCache = [] as any;

const prefix = '/occurrences-categories/';

export const getCategories = () => {
  if (!softCache['get-occurrences-categories'])
    softCache['get-occurrences-categories'] = getAPIClient().get(`${prefix}`);

  return softCache['get-occurrences-categories'];
};
