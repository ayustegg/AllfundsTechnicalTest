import { useEffect, useState } from "react";

import { PaginationComponent } from "@/components/pagination-component";
import { NewsCard } from "@/components/news-card";
import type { NewsItem } from "@/types/news";
import { API_ENDPOINTS, API_URL } from "@/constants/api";
import { NewsAlerts } from "@/components/news-alerts";

export const Archived = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const fetchNews = async (pageToFetch: number) => {
    try {
      const response = await fetch(
        `${API_URL}${API_ENDPOINTS().NEWS_ARCHIVED}?page=${pageToFetch}&limit=3`
      );
      const data = await response.json();
      setNews(data.data);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    fetchNews(page);
  }, [page]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS().NEWS}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to archive item");
      }
      setAlertMessage("Noticia eliminada exitosamente");
      setShowAlert(true);
      fetchNews(page);
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage("Error al eliminar la noticia");
      setShowAlert(true);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">News Archived</h1>
      {news.length === 0 && (
        <p className="text-gray-500 mb-4">No news archived available.</p>
      )}
      <div className="grid grid-cols-1 gap-4 w-full">
        {news.map((item, index) => (
          <NewsCard
            key={index}
            item={item}
            actionType="delete"
            onAction={handleDelete}
            actionLabel="Delete"
            actionVariant="destructive"
          />
        ))}
      </div>
      {news.length !== 0 && (
        <>
          <PaginationComponent
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
          <p className="text-sm text-gray-500 mt-2">
            Items: {news.length} | Total items {totalItems}
          </p>
        </>
      )}
      {showAlert && (
        <NewsAlerts
          message={alertMessage}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      )}
    </>
  );
};
