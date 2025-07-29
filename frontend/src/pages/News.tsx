import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { PaginationComponent } from "@/components/pagination-component";
import { NewsCard } from "@/components/news-card";

import type { NewsItem } from "@/types/news";
import { API_ENDPOINTS, API_URL } from "@/constants/api";
import { NewsAlerts } from "@/components/news-alerts";

export const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const fetchNews = async (pageToFetch: number) => {
    try {
      const response = await fetch(
        `${API_URL}${API_ENDPOINTS().NEWS}?page=${pageToFetch}&limit=3`
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

  const handleArchive = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS(id).ARCHIVE}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to archive item");
      }

      setAlertMessage(`News archived successfully`);
      setShowAlert(true);

      fetchNews(page);
    } catch (error) {
      console.error("Error archiving news:", error);
      setAlertMessage("Error archiving news");
      setShowAlert(true);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">News</h1>
      {news.length === 0 && (
        <p className="text-gray-500 mb-4">No news available.</p>
      )}
      <Button
        className="mb-4"
        onClick={() => (window.location.href = "/news/create")}
      >
        Create
      </Button>
      <div className="grid grid-cols-1 gap-4 w-full">
        {news.map((item, index) => (
          <NewsCard
            key={index}
            item={item}
            actionType="archive"
            onAction={handleArchive}
            actionLabel="Archive"
            actionVariant="default"
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
