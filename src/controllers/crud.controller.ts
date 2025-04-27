import { Request, Response } from "express";
import { Document, Model } from "mongoose";

export abstract class CrudController<T extends Document> {
    constructor(protected model: Model<T>) { }

    public create = async (req: Request, res: Response): Promise<Response> => {
        const entity = new this.model(req.body);
        try {
            await entity.save();
            return res.status(201).json({ success: true, data: entity });
        } catch (err: any) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }

    public getAll = async (_req: Request, res: Response): Promise<Response> => {
        try {
            const items = await this.model.find();
            return res.status(200).json({ success: true, data: items });
        } catch (err: any) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }

    public getById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const item = await this.model.findById(req.params.id);
            if (!item) return res.status(404).json({ success: false, message: "Not found" });
            return res.status(200).json({ success: true, data: item });
        } catch (err: any) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }

    public update = async (req: Request, res: Response): Promise<Response> => {
        try {
            const item = await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!item) return res.status(404).json({ success: false, message: "Not found" });
            return res.status(200).json({ success: true, data: item });
        } catch (err: any) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }

    public delete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const item = await this.model.findByIdAndDelete(req.params.id);
            if (!item) return res.status(404).json({ success: false, message: "Not found" });
            return res.status(200).json({ success: true, data: item });
        } catch (err: any) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }

    public getPaginated = async (req: Request, res: Response): Promise<Response> => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        try {
            const items = await this.model.find()
                .skip((page - 1) * limit)
                .limit(limit);
            const total = await this.model.countDocuments();
            return res.status(200).json({
                success: true,
                data: items,
                pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
            });
        } catch (err: any) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }
}
