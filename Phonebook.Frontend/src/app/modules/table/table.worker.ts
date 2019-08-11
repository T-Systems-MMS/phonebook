import { performSearch } from 'src/app/modules/table/SearchParams';

/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  postMessage(performSearch(data));
});
