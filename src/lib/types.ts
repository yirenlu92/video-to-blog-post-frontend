// src/lib/types.ts

export interface ConversionResult {
  markdown: string;
}

export interface AcceptResponse {
  call_id: string;
}

export interface PollResponse {
  status:
    | "processing"
    | "completed";
  result?: ConversionResult;
}

export type ConversionStatus =

    | "idle"
    | "processing"
    | "completed"
    | "error";

export interface YouTubeRequest {
  youtube_url: string;
}
