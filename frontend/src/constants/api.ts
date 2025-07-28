export const API_URL = "http://localhost:4000/api";

export const API_ENDPOINTS = (id?: string) =>
  ({
    NEWS: `/news`,
    ARCHIVE: `/news/${id}/archive`,
    CREATE: `/news`,
  } as const);
