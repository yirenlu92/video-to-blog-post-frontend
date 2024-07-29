<!-- ConversionStatus.svelte -->
<script>
    export let conversionStatus;
  </script>
  
  {#if conversionStatus === 'processing'}
    <div class="mb-8 text-center">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      <p class="mt-2 text-gray-600">Converting video to markdown...</p>
    </div>
  {:else if conversionStatus === 'error'}
    <div class="mb-8 text-center text-red-500">
      <p>An error occurred during conversion. Please try again.</p>
    </div>
  {/if}