import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios, { isAxiosError } from "axios";

import { RequestOptions } from "./types";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export class ApiError extends Error {
  errors: {
    title: string;
    status: number;
    detail: string;
  };

  constructor(errors: { title: string; status: number; detail: string }) {
    super(errors.title);
    this.name = "ApiError";
    this.errors = errors;
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}

export class ApiClient {
  private _api: AxiosInstance;
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;

    this._api = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 30000,
      withCredentials: true, // For httpOnly cookies
    });
  }

  protected async request<T>(
    method: "get" | "post" | "put" | "delete" | "patch",
    endpoint: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        method,
        url: endpoint,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...options?.headers,
        },
      };

      if (data && ["post", "put", "patch"].includes(method)) {
        config.data = data;
      }

      if (data && ["get", "delete"].includes(method)) {
        config.params = data;
      }

      const apiInstance = options?.customBaseUrl
        ? axios.create({
            baseURL: options.customBaseUrl,
            headers: config.headers,
            timeout: config.timeout,
            withCredentials: true,
          })
        : this._api;

      const response: AxiosResponse<T> = await apiInstance.request(config);

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new UnauthorizedError();
        }

        if (error.response?.data) {
          const responseData = error.response.data as {
            errors?: { title?: string; detail?: string };
          };
          throw new ApiError({
            title: responseData.errors?.title ?? "API Error",
            status: error.response.status,
            detail:
              responseData.errors?.detail ??
              JSON.stringify(error.response.data),
          });
        }
      }

      throw error;
    }
  }

  async get<T>(
    endpoint: string,
    params?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>("get", endpoint, params, options);
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>("post", endpoint, data, options);
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>("put", endpoint, data, options);
  }

  async delete<T>(
    endpoint: string,
    params?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>("delete", endpoint, params, options);
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>("patch", endpoint, data, options);
  }
}
