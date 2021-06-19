const SEARCH_PATH = '/api/search';

export function searchForArticles(term: string, locale: string) {
  return term.length >= 3 ? fetch(`${SEARCH_PATH}?term=${term}&locale=${locale}`).then((res) => res.json()) : [];
}
