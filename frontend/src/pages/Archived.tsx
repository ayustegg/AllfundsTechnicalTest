import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { PaginationComponent } from "@/components/pagination-component";
import type { NewsItem } from "@/types/news";
import { API_ENDPOINTS, API_URL } from "@/constants/api";

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
        `${API_URL}${API_ENDPOINTS.ARCHIVE}?page=${pageToFetch}&limit=3`
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

  const handleDelete = async (index: string) => {
    console.error("Deleting news item with index:", index);
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.NEWS}/${index}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to archive item");

      const updatedNews = news.filter((item) => item._id !== index);
      setAlertMessage("Noticia eliminada exitosamente");
      setShowAlert(true);

      if (updatedNews.length === 0 && page > 1) {
        setPage(page - 1);
      } else {
        fetchNews(page);
      }
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((item, index) => (
          <Card key={index} className="w-full max-w-sm min-h-[350px]">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{item.content}</p>
            </CardContent>
            <CardFooter className="flex-col">
              <span className="text-sm text-gray-500">
                Author: {item.author}
              </span>
              <span className="text-sm text-gray-500">Date: {item.date}</span>
              <Button
                variant="destructive"
                className="mt-2"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
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
        <Alert
          className={`max-w-sm duration-300 ${
            alertMessage.includes("Error")
              ? "bg-red-500 text-white border-red-600"
              : "bg-green-500 text-white border-green-600"
          }`}
        >
          <AlertTitle className="text-sm font-medium">
            {alertMessage}
          </AlertTitle>
        </Alert>
      )}
    </>
  );
};
