import type {
  ConversionResult,
  AcceptResponse,
  PollResponse,
  VideoRequest,
} from "$lib/types";

const API_BASE_URL =
  "https://video-to-blog-post--video-to-blog-post-fastapi-app.modal.run";

async function startConversion(
  videoFile: File
): Promise<string> {
  const formData =
    new FormData();
  formData.append(
    "video",
    videoFile
  );

  const response =
    await fetch(
      `${API_BASE_URL}/accept`,
      {
        method:
          "POST",
        body: formData,
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

export async function convertVideoToMarkdown(
  videoFile: File
): Promise<string> {
  const callId =
    await startConversion(
      videoFile
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
