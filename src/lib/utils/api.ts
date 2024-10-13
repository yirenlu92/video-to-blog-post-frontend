import type {
  ConversionResult,
  AcceptResponse,
  PollResponse,
  VideoRequest,
} from "$lib/types";

const API_BASE_URL =
  "https://video-to-blog-post--video-to-blog-post-fastapi-app.modal.run";

const API_BASE_URL_DEV =
  "https://video-to-blog-post-dev--video-to-blog-post-fastapi-app.modal.run";

const isDevelopment =
  process.env
    .NODE_ENV ===
  "development";

console.log(
  "Is development"
);
console.log(
  isDevelopment
);

const apiBaseUrl =
  isDevelopment
    ? API_BASE_URL_DEV
    : API_BASE_URL;

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
      `${apiBaseUrl}/accept`,
      {
        method:
          "POST",
        body: formData,
      }
    );
  if (
    !response.ok
  ) {
    throw new Error(
      `HTTP error! status: ${response.status}`
    );
  }
  const data: AcceptResponse =
    await response.json();
  return data.call_id;
}

async function pollResult(
  callId: string
): Promise<PollResponse> {
  const response =
    await fetch(
      `${apiBaseUrl}/result/${callId}`
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
  if (
    response.status ===
    500
  ) {
    const errorData =
      await response.json();
    throw new Error(
      `A 500 error occurred during conversion: ${errorData.message}`
    );
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
  try {
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
  } catch (error) {
    if (
      error instanceof
      Error
    ) {
      throw new Error(
        `Conversion failed: ${error.message}`
      );
    } else {
      throw new Error(
        "An unknown error occurred during conversion"
      );
    }
  }
}
