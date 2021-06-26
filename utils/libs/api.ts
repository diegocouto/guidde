const MESSAGES_PATH = '/api/messages';
const SEARCH_PATH = '/api/search';

interface SendMessageData {
  email: string;
  message: string;
  subject?: string;
}

export function searchForArticles(term: string, locale: string) {
  return term.length >= 3 ? fetch(`${SEARCH_PATH}?term=${term}&locale=${locale}`).then((res) => res.json()) : [];
}

export function sendMessage(data: SendMessageData) {
  return fetch(MESSAGES_PATH, { method: 'POST', body: JSON.stringify(data) });
}
