import { Request } from "express";
import { Model, Document, Query } from "mongoose";

/**
 * Interface representing a paginated result.
 */
interface Pagination<T> {
    items: T[];
    pagination: PaginationInfo;
}

/**
 * Interface representing pagination information.
 */
interface PaginationInfo {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

/**
 * @description Base service providing generic CRUD operations for a Mongoose model.
 */
abstract class RepositoryService<T extends Document> {
    constructor(protected model: Model<T>) { }

    /**
     * @description Create a new entity.
     * @param data Partial entity data.
     * @returns The created entity.
     */
    async create(data: Partial<T>): Promise<T> {
        const entity = new this.model(data);
        const savedEntity = await entity.save();
        return savedEntity.toObject() as T;
    }

    /**
     * @description Retrieve entities with optional filters, pagination, and relations.
     * @param req Express request object containing query parameters.
     * @returns A paginated result with the entities.
     */
    async get(req: Request): Promise<Pagination<T>> {
        const { page = 1, limit = 20, with: withRelations, ...filters } = req.query as any;

        const validFields = Object.keys(this.model.schema.paths);
        const cleanFilters: Record<string, any> = {};
        for (const key of Object.keys(filters)) {
            if (validFields.includes(key)) {
                cleanFilters[key] = filters[key];
            }
        }

        const baseQuery = this.model.find(cleanFilters);
        return this.getPaginated(req, baseQuery);
    }

    /**
     * @description Apply pagination to a Mongoose query.
     * @param req Express request object containing pagination and relations.
     * @param baseQuery The base Mongoose query to paginate.
     * @returns A paginated result with the entities.
     */
    async getPaginated(req: Request, baseQuery: Query<T[], any>): Promise<Pagination<T>> {
        const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;
        const skip = (page - 1) * limit;

        let queryCount = baseQuery.clone().countDocuments();
        let query = baseQuery.skip(skip).limit(limit);

        if (typeof req.query.with === "string") {
            const relations = (req.query.with as string).split(",").map((r) => r.trim());
            for (const rel of relations) {
                query = query.populate(rel);
            }
        }

        const items = await query.exec();
        const total = await queryCount.exec();


        return {
            items: items as T[],
            pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }

        };
    }

    /**
     * @description Retrieve a single entity by its ID.
     * @param id Entity ID.
     * @returns The entity if found, otherwise null.
     */
    async getById(id: string): Promise<T | null> {
        return this.model.findById(id);
    }

    /**
     * @description Update an existing entity by its ID.
     * @param id Entity ID.
     * @param data Partial update data.
     * @returns The updated entity if found, otherwise null.
     */
    async update(id: string, data: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }

    /**
     * @description Delete an entity by its ID.
     * @param id Entity ID.
     * @returns The deleted entity if found, otherwise null.
     */
    async delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id);
    }

    /**
     * @description Inactivate an entity by its ID.
     * @param id Entity ID.
     * @returns The inactivated entity if found, otherwise null.
     */

    async inactivate(id: string): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, { status: "INACTIVE" }, { new: true });
    }

}

export { RepositoryService, Pagination };
