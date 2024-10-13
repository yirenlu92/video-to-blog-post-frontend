<script lang="ts">
    import VideoInput from '$lib/components/VideoInput.svelte';
    import ConversionStatus from '$lib/components/ConversionStatus.svelte';
    import MarkdownOutput from '$lib/components/MarkdownOutput.svelte';
    import { convertVideoToMarkdown } from '$lib/utils/api';
    import type { ConversionStatus as ConversionStatusType } from '$lib/types';

  
    let videoFile: File | null = null;
    let conversionStatus: ConversionStatusType = 'idle';
    let markdownContent = '';
    let uneditedTranscript = '';
    let errorMessage = '';
  
    async function handleVideoUpload(event: CustomEvent<File>) {
      videoFile = event.detail;
      await handleConvert();
    }
  
    async function handleConvert() {
      if (!videoFile) return;
      
      conversionStatus = 'processing';
      errorMessage = '';
      try {
        markdownContent = await convertVideoToMarkdown(videoFile);
        conversionStatus = 'completed';
      } catch (error) {
        console.error('Error:', error);
        conversionStatus = 'error';
        errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      }
    }
  </script>
  
  <svelte:head>
    <title>Video to Markdown Converter</title>
  </svelte:head>    
  
  <h1 class="text-4xl font-bold mb-8 text-center text-gray-800">Video to Markdown Converter</h1>
  <VideoInput on:upload={handleVideoUpload} />
  {#if videoFile}
    <p class="mt-2 text-sm text-gray-600">
      Selected video: {videoFile.name} ({(videoFile.size / 1024 / 1024).toFixed(2)} MB)
    </p>
  {/if}
  <ConversionStatus {conversionStatus} {errorMessage} />
  {#if conversionStatus === 'completed'}
    <MarkdownOutput {markdownContent} />
  {/if}