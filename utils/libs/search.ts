import Fuse from 'fuse.js';

import { CacheEntry, getArticlesCache } from './cache';

const Search = (function () {
  let finder: Fuse<CacheEntry>;

  function hydrateFinder() {
    const documents = loadDocuments();

    finder = new Fuse(documents, {
      minMatchCharLength: 2,
      useExtendedSearch: true,
      keys: ['locale', 'tags', 'title', 'description'],
    });
  }

  function loadDocuments() {
    return getArticlesCache();
  }

  return {
    find: (term: string, locale: string) => {
      if (!finder) {
        hydrateFinder();
      }

      return finder.search(
        {
          $and: [
            { locale: `=${locale}` },
            {
              $or: [{ tags: term }, { title: term }, { description: term }],
            },
          ],
        },
        {
          limit: 5,
        }
      );
    },
  };
})();

export default Search;
