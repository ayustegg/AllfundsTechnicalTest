export const API_URL = "http://localhost:3000/api";

export const API_ENDPOINTS = (id?: string) =>
  ({
    NEWS: `/news`,
    ARCHIVE: `/news/${id}/archive`,
    NEWS_ARCHIVED: `/news/archive`,
    CREATE: `/news`,
  } as const);
