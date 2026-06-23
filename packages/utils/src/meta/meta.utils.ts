import {
  isNotNullOrUndefined,
  isNullOrUndefined,
} from "../common/common.utils";
import { isPlainObject } from "../object/object.utils";

export type MetaInfo = {
  code: string;
  message: string;
};

/**
 * Wraps success state and metadata messages for an API response.
 */
export type MetaResponse = {
  success: boolean;
  metaInfos: MetaInfo[];
};

/**
 * Standard API response envelope.
 */
export type ApiResponse<T> = {
  data: T;
  status: number;
  metaResponse: MetaResponse;
};

const isMetaInfo = (value: unknown): value is MetaInfo => {
  return (
    isPlainObject(value) &&
    typeof value.code === "string" &&
    typeof value.message === "string"
  );
};

const isMetaResponse = (value: unknown): value is MetaResponse => {
  return (
    isPlainObject(value) &&
    typeof value.success === "boolean" &&
    Array.isArray(value.metaInfos) &&
    value.metaInfos.every(isMetaInfo)
  );
};

/**
 * Checks whether a value matches the {@link ApiResponse} shape.
 */
const isApiResponse = <T = unknown>(
  value: unknown,
): value is ApiResponse<T> => {
  return (
    isPlainObject(value) &&
    "data" in value &&
    typeof value.status === "number" &&
    isMetaResponse(value.metaResponse)
  );
};

/**
 * Creates a {@link MetaInfo} object.
 */
const createMetaInfo = (code: string, message: string): MetaInfo => ({
  code,
  message,
});

/**
 * Creates a {@link MetaResponse} object.
 */
const createMetaResponse = (
  success: boolean,
  metaInfos: MetaInfo[] = [],
): MetaResponse => ({
  success,
  metaInfos,
});

/**
 * Creates an {@link ApiResponse} object.
 */
const createApiResponse = <T>(
  data: T,
  status: number,
  metaResponse: MetaResponse,
): ApiResponse<T> => ({
  data,
  status,
  metaResponse,
});

/**
 * Builds a successful API response.
 */
const successResponse = <T>(
  data: T,
  status = 200,
  metaInfos: MetaInfo[] = [],
): ApiResponse<T> =>
  createApiResponse(data, status, createMetaResponse(true, metaInfos));

/**
 * Builds a failed API response.
 */
const errorResponse = <T = null>(
  metaInfos: MetaInfo[] | MetaInfo,
  status = 400,
  data: T = null as T,
): ApiResponse<T> => {
  const infos = Array.isArray(metaInfos) ? metaInfos : [metaInfos];

  return createApiResponse(data, status, createMetaResponse(false, infos));
};

/**
 * Returns whether the API response was successful.
 */
const isSuccess = <T>(response: ApiResponse<T> | null | undefined): boolean => {
  if (isNullOrUndefined(response)) return false;

  return response.metaResponse.success === true;
};

/**
 * Returns whether the API response failed.
 */
const isFailure = <T>(response: ApiResponse<T> | null | undefined): boolean =>
  !isSuccess(response);

/**
 * Returns metadata messages from an API response.
 */
const getMetaInfos = <T>(
  response: ApiResponse<T> | null | undefined,
): MetaInfo[] => {
  if (isNullOrUndefined(response)) return [];

  return response.metaResponse.metaInfos;
};

/**
 * Returns all metadata codes from an API response.
 */
const getMetaCodes = <T>(
  response: ApiResponse<T> | null | undefined,
): string[] => getMetaInfos(response).map((info) => info.code);

/**
 * Returns all metadata messages from an API response.
 */
const getMetaMessages = <T>(
  response: ApiResponse<T> | null | undefined,
): string[] => getMetaInfos(response).map((info) => info.message);

/**
 * Finds the first metadata entry for a code.
 */
const findMetaInfoByCode = <T>(
  response: ApiResponse<T> | null | undefined,
  code: string,
): MetaInfo | null => {
  return getMetaInfos(response).find((info) => info.code === code) ?? null;
};

/**
 * Checks whether an API response contains a metadata code.
 */
const hasMetaCode = <T>(
  response: ApiResponse<T> | null | undefined,
  code: string,
): boolean => isNotNullOrUndefined(findMetaInfoByCode(response, code));

/**
 * Returns the first metadata entry.
 */
const getFirstMetaInfo = <T>(
  response: ApiResponse<T> | null | undefined,
): MetaInfo | null => getMetaInfos(response)[0] ?? null;

/**
 * Returns the first metadata message.
 */
const getFirstMetaMessage = <T>(
  response: ApiResponse<T> | null | undefined,
): string | null => getFirstMetaInfo(response)?.message ?? null;

/**
 * Returns response data when the call succeeded, otherwise `null`.
 */
const getResponseData = <T>(
  response: ApiResponse<T> | null | undefined,
): T | null => {
  if (isNullOrUndefined(response) || !response.metaResponse.success)
    return null;

  return response.data;
};

/**
 * Returns the HTTP-like status from an API response.
 */
const getResponseStatus = <T>(
  response: ApiResponse<T> | null | undefined,
): number | null => response?.status ?? null;

/**
 * Joins metadata messages into a single string.
 */
const formatMetaMessages = <T>(
  response: ApiResponse<T> | null | undefined,
  separator = "; ",
): string => getMetaMessages(response).join(separator);

export interface MetaUtils {
  isMetaInfo(value: unknown): value is MetaInfo;
  isMetaResponse(value: unknown): value is MetaResponse;
  isApiResponse<T = unknown>(value: unknown): value is ApiResponse<T>;
  createMetaInfo(code: string, message: string): MetaInfo;
  createMetaResponse(success: boolean, metaInfos?: MetaInfo[]): MetaResponse;
  createApiResponse<T>(
    data: T,
    status: number,
    metaResponse: MetaResponse,
  ): ApiResponse<T>;
  successResponse<T>(
    data: T,
    status?: number,
    metaInfos?: MetaInfo[],
  ): ApiResponse<T>;
  errorResponse<T = null>(
    metaInfos: MetaInfo[] | MetaInfo,
    status?: number,
    data?: T,
  ): ApiResponse<T>;
  isSuccess<T>(response: ApiResponse<T> | null | undefined): boolean;
  isFailure<T>(response: ApiResponse<T> | null | undefined): boolean;
  getMetaInfos<T>(response: ApiResponse<T> | null | undefined): MetaInfo[];
  getMetaCodes<T>(response: ApiResponse<T> | null | undefined): string[];
  getMetaMessages<T>(response: ApiResponse<T> | null | undefined): string[];
  findMetaInfoByCode<T>(
    response: ApiResponse<T> | null | undefined,
    code: string,
  ): MetaInfo | null;
  hasMetaCode<T>(
    response: ApiResponse<T> | null | undefined,
    code: string,
  ): boolean;
  getFirstMetaInfo<T>(
    response: ApiResponse<T> | null | undefined,
  ): MetaInfo | null;
  getFirstMetaMessage<T>(
    response: ApiResponse<T> | null | undefined,
  ): string | null;
  getResponseData<T>(response: ApiResponse<T> | null | undefined): T | null;
  getResponseStatus<T>(
    response: ApiResponse<T> | null | undefined,
  ): number | null;
  formatMetaMessages<T>(
    response: ApiResponse<T> | null | undefined,
    separator?: string,
  ): string;
}

export const metaUtils: MetaUtils = {
  isMetaInfo,
  isMetaResponse,
  isApiResponse,
  createMetaInfo,
  createMetaResponse,
  createApiResponse,
  successResponse,
  errorResponse,
  isSuccess,
  isFailure,
  getMetaInfos,
  getMetaCodes,
  getMetaMessages,
  findMetaInfoByCode,
  hasMetaCode,
  getFirstMetaInfo,
  getFirstMetaMessage,
  getResponseData,
  getResponseStatus,
  formatMetaMessages,
};

export {
  isMetaInfo,
  isMetaResponse,
  isApiResponse,
  createMetaInfo,
  createMetaResponse,
  createApiResponse,
  successResponse,
  errorResponse,
  isSuccess,
  isFailure,
  getMetaInfos,
  getMetaCodes,
  getMetaMessages,
  findMetaInfoByCode,
  hasMetaCode,
  getFirstMetaInfo,
  getFirstMetaMessage,
  getResponseData,
  getResponseStatus,
  formatMetaMessages,
};
