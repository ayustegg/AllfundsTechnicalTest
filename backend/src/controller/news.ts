import { Request, Response } from 'express';
import News from '../models/news';

export async function getActiveNews(req: Request, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const [news, total] = await Promise.all([
            News.find({ archiveDate: null })
                .sort({ date: -1 })
                .skip(skip)
                .limit(limit),
            News.countDocuments({ archiveDate: null })
        ]);

        res.json({
            data: news,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total
        });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}


export async function getArchiveNews(req: Request, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const [news, total] = await Promise.all([
            News.find({ archiveDate: { $ne: null } })
                .sort({ archiveDate: -1 })
                .skip(skip)
                .limit(limit),
            News.countDocuments({ archiveDate: { $ne: null } })
        ]);
        res.json({
            data: news,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total
        });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export async function archiveNews(req: Request, res: Response) {
    try {
        const news = await News.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { archiveDate: new Date() } },
            { new: true }
        );
        if (!news) return res.status(404).json({ message: 'New not found' });
        res.json({ message: 'New Deleted' });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export async function createNews(req: Request, res: Response) {
    const { title, description, content, date, author } = req.body;

    if (!title || !description || !content || !date || !author) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const news = new News({
            title,
            description,
            content,
            date: new Date(date),
            author
        });
        await news.save();
        res.status(201).json(news);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export async function deleteNews(req: Request, res: Response) {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) return res.status(404).json({ message: 'New not found' });
        res.json({ message: 'New Deleted' });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}