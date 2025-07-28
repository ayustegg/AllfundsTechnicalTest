import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { NewsItem } from "@/types/news";

interface NewsCardProps {
  item: NewsItem;
  actionType: "archive" | "delete";
  onAction: (id: string) => Promise<void>;
  actionLabel: string;
  actionVariant?: "default" | "destructive";
}

export const NewsCard: React.FC<NewsCardProps> = ({
  item,
  actionType,
  onAction,
  actionLabel,
  actionVariant = "default",
}) => {
  const handleAction = async () => {
    try {
      await onAction(item._id);
    } catch (error) {
      console.error(`Error ${actionType}ing news:`, error);
    }
  };

  return (
    <Card className="w-full max-w-sm min-h-[350px] overflow-hidden">
      <CardHeader>
        <CardTitle className="truncate w-full">{item.title}</CardTitle>
        <CardDescription className="truncate w-full">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="truncate w-full">{item.content}</p>
      </CardContent>
      <CardFooter className="flex-col">
        <span className="text-sm text-gray-500 truncate w-full">
          Author: {item.author}
        </span>
        <span className="text-sm text-gray-500 truncate w-full">
          Date: {item.date}
        </span>
        {item.archiveDate && (
          <span className="text-sm text-gray-500 truncate w-full">
            Archived: {item.archiveDate}
          </span>
        )}
        <Button variant={actionVariant} className="mt-2" onClick={handleAction}>
          {actionLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};
