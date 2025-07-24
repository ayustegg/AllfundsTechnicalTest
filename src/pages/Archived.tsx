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

export const Archived = () => {

    const [newsArchived, setNewsArchived] = useState<NewsItem[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/mongo.json');
                const data = await response.json();
                const news: NewsItem[] = data.filter((item: NewsItem) => item.archiveDate);
                setNewsArchived(news);
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchNews();
    }, []);

    const handleDelete = (index: number) => {
        setNewsArchived(prevNews => prevNews.filter((_, i) => i !== index));
    };
    return <>
        <h1 className="text-2xl font-bold mb-4">Archived</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newsArchived.map((item, index) => (
                <Card key={index}>
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
                            variant="destructive"
                            onClick={() => handleDelete(index)}
                        >
                            Delete
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
        <br />
    </>;
};

