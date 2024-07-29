<script>
    import YouTubeInput from '../lib/components/YouTubeInput.svelte';
    import ConversionStatus from '../lib/components/ConversionStatus.svelte';
    import MarkdownOutput from '../lib/components/MarkdownOutput.svelte';
    import { convertYouTubeToMarkdown } from '../lib/utils/api';
  
    let youtubeUrl = '';
    let conversionStatus = 'idle';
    let markdownContent = '';
  
    async function handleConvert() {
      conversionStatus = 'processing';
      try {
        markdownContent = await convertYouTubeToMarkdown(youtubeUrl);
        conversionStatus = 'completed';
      } catch (error) {
        console.error('Error:', error);
        conversionStatus = 'error';
      }
    }
  </script>
  
  <svelte:head>
    <title>YouTube to Markdown Converter</title>
  </svelte:head>
  
  <h1 class="text-4xl font-bold mb-8 text-center text-gray-800">YouTube to Markdown Converter</h1>
  <YouTubeInput bind:youtubeUrl on:convert={handleConvert} />
  <ConversionStatus {conversionStatus} />
  <MarkdownOutput {markdownContent} />