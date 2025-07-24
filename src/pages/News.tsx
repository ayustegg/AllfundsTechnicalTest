import { useEffect, useState } from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import type { NewsItem } from '../types/news';

export const News = () => {

    const [news, setNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/mongo.json');
                const data = await response.json();
                const news: NewsItem[] = data.filter((item: NewsItem) => !item.archiveDate);
                setNews(news);
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchNews();
    }, []);

    const handleArchive = (index: number) => {
        setNews(prevNews => prevNews.filter((_, i) => i !== index));
    };
    return <>
        <h1 className="text-2xl font-bold mb-4">News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {news.map((item, index) => (
                <Card key={index} className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{item.content}</p>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <span className="text-sm text-gray-500">
                            {new Date(item.date).toLocaleDateString()}
                        </span>
                        <Button
                            onClick={() => handleArchive(index)}
                        >
                            Archive
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
        <br />
    </>;
};

