const API_KEY = '3ok9FZai0fmQMEVDMy5l3s9MCEdwpbmS';

export const FETCH_TRENDING_GIFS = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=30&rating=G&lang=en`;

export const FETCH_SEARCH_GIFS = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=30&rating=G&lang=en`;