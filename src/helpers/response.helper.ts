import { Response } from "express";

/**
 * @description Helper class to standardize API responses.
 */
export class ResponseHelper {
  /**
   * @description Send a successful response with data.
   * @param res Express response object.
   * @param data The data to return.
   * @param statusCode Optional status code (default: 200).
   * @returns Response object.
   */
  static success(res: Response, data: any, statusCode: number = 200): Response {
    return res.status(statusCode).json({
      success: true,
      data
    });
  }

  /**
   * @description Send an error response with a message.
   * @param res Express response object.
   * @param message Error message.
   * @param statusCode Optional status code (default: 500).
   * @returns Response object.
   */
  static error(res: Response, message: string, statusCode: number = 500): Response {
    return res.status(statusCode).json({
      success: false,
      message
    });
  }
}
