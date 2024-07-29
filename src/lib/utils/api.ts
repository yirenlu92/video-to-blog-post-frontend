import type {
  ConversionResult,
  AcceptResponse,
  PollResponse,
  YouTubeRequest,
} from "$lib/types";

const API_BASE_URL =
  "https://yirenlu92--video-to-blog-post-fastapi-app.modal.run";

async function startConversion(
  youtubeUrl: string
): Promise<string> {
  const request: YouTubeRequest =
    {
      youtube_url:
        youtubeUrl,
    };
  const response =
    await fetch(
      `${API_BASE_URL}/accept`,
      {
        method:
          "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          request
        ),
      }
    );
  const data: AcceptResponse =
    await response.json();
  return data.call_id;
}

async function pollResult(
  callId: string
): Promise<PollResponse> {
  const response =
    await fetch(
      `${API_BASE_URL}/result/${callId}`
    );
  if (
    response.status ===
    202
  ) {
    return {
      status:
        "processing",
    };
  }
  const data: ConversionResult =
    await response.json();
  return {
    status:
      "completed",
    result: data,
  };
}

export async function convertYouTubeToMarkdown(
  youtubeUrl: string
): Promise<string> {
  const callId =
    await startConversion(
      youtubeUrl
    );

  while (true) {
    const pollResponse =
      await pollResult(
        callId
      );
    if (
      pollResponse.status ===
        "completed" &&
      pollResponse.result
    ) {
      console.log(
        pollResponse
          .result
          .markdown
      );
      return pollResponse
        .result
        .markdown;
    }
    // Wait for 5 seconds before polling again
    await new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          5000
        )
    );
  }
}

// Optional: Add a timeout mechanism
export async function convertYouTubeToMarkdownWithTimeout(
  youtubeUrl: string,
  timeoutSeconds: number = 300
): Promise<string> {
  const callId =
    await startConversion(
      youtubeUrl
    );
  const startTime =
    Date.now();

  while (true) {
    if (
      Date.now() -
        startTime >
      timeoutSeconds *
        1000
    ) {
      throw new Error(
        "Conversion timed out"
      );
    }

    const pollResponse =
      await pollResult(
        callId
      );
    if (
      pollResponse.status ===
        "completed" &&
      pollResponse.result
    ) {
      return pollResponse
        .result
        .markdown;
    }
    // Wait for 2 seconds before polling again
    await new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          2000
        )
    );
  }
}
