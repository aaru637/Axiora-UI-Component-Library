import { describe, expect, it } from "vitest";
import {
  createApiResponse,
  createMetaInfo,
  createMetaResponse,
  errorResponse,
  findMetaInfoByCode,
  formatMetaMessages,
  getFirstMetaMessage,
  getMetaCodes,
  getMetaInfos,
  getMetaMessages,
  getResponseData,
  getResponseStatus,
  hasMetaCode,
  isApiResponse,
  isFailure,
  isMetaInfo,
  isMetaResponse,
  isSuccess,
  successResponse,
} from "./meta.utils";

describe("Meta Utils", () => {
  const metaInfos = [
    createMetaInfo("USER_NOT_FOUND", "User does not exist"),
    createMetaInfo("INVALID_TOKEN", "Token is invalid"),
  ];

  const success = successResponse({ id: 1, name: "Ada" });
  const failure = errorResponse(metaInfos, 404);

  it("creates meta, meta response, and api response objects", () => {
    const info = createMetaInfo("OK", "Success");
    const metaResponse = createMetaResponse(true, [info]);
    const response = createApiResponse({ ok: true }, 200, metaResponse);

    expect(info).toEqual({ code: "OK", message: "Success" });
    expect(metaResponse).toEqual({ success: true, metaInfos: [info] });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ ok: true });
  });

  it("identifies meta shapes with type guards", () => {
    expect(isMetaInfo({ code: "A", message: "B" })).toBe(true);
    expect(isMetaInfo({ code: "A" })).toBe(false);
    expect(
      isMetaResponse({
        success: true,
        metaInfos: [{ code: "A", message: "B" }],
      }),
    ).toBe(true);
    expect(isApiResponse(success)).toBe(true);
    expect(isApiResponse({ data: 1 })).toBe(false);
  });

  it("builds success and error responses", () => {
    expect(success.metaResponse.success).toBe(true);
    expect(success.status).toBe(200);
    expect(failure.metaResponse.success).toBe(false);
    expect(failure.status).toBe(404);
    expect(failure.data).toBe(null);
  });

  it("checks success and failure state", () => {
    expect(isSuccess(success)).toBe(true);
    expect(isFailure(success)).toBe(false);
    expect(isSuccess(failure)).toBe(false);
    expect(isFailure(failure)).toBe(true);
    expect(isSuccess(null)).toBe(false);
  });

  it("reads metadata collections and messages", () => {
    expect(getMetaInfos(failure)).toEqual(metaInfos);
    expect(getMetaCodes(failure)).toEqual(["USER_NOT_FOUND", "INVALID_TOKEN"]);
    expect(getMetaMessages(failure)).toEqual([
      "User does not exist",
      "Token is invalid",
    ]);
    expect(formatMetaMessages(failure)).toBe(
      "User does not exist; Token is invalid",
    );
  });

  it("finds metadata by code and reads first message", () => {
    expect(findMetaInfoByCode(failure, "INVALID_TOKEN")).toEqual(metaInfos[1]);
    expect(hasMetaCode(failure, "USER_NOT_FOUND")).toBe(true);
    expect(hasMetaCode(failure, "MISSING")).toBe(false);
    expect(getFirstMetaMessage(failure)).toBe("User does not exist");
  });

  it("returns response data and status safely", () => {
    expect(getResponseData(success)).toEqual({ id: 1, name: "Ada" });
    expect(getResponseData(failure)).toBe(null);
    expect(getResponseStatus(success)).toBe(200);
    expect(getResponseStatus(null)).toBe(null);
  });
});
