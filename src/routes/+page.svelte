<script lang="ts">
    import VideoInput from '$lib/components/VideoInput.svelte';
    import ConversionStatus from '$lib/components/ConversionStatus.svelte';
    import MarkdownOutput from '$lib/components/MarkdownOutput.svelte';
    import { convertVideoToMarkdown } from '$lib/utils/api';
  
    let videoFile: File | null = null;
    let conversionStatus: 'idle' | 'processing' | 'completed' | 'error' = 'idle';
    let markdownContent = '';
    let uneditedTranscript = '';
  
    async function handleVideoUpload(event: CustomEvent<File>) {
      videoFile = event.detail;
      await handleConvert();
    }
  
    async function handleConvert() {
      if (!videoFile) return;
      
      conversionStatus = 'processing';
      try {
        markdownContent = await convertVideoToMarkdown(videoFile);
        conversionStatus = 'completed';
      } catch (error) {
        console.error('Error:', error);
        conversionStatus = 'error';
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
  <ConversionStatus {conversionStatus} />
  <!-- {#if conversionStatus === 'completed'} -->
    <MarkdownOutput {markdownContent} />
  <!-- {/if} -->