<script lang="ts">
  import type { ConversionStatus } from '$lib/types';

  export let conversionStatus: ConversionStatus;
  export let errorMessage: string = '';
</script>

<div class="mb-8 text-center">
  {#if conversionStatus === 'processing'}
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    <p class="mt-2 text-gray-600">Converting video to markdown...</p>
  {:else if conversionStatus === 'error'}
    <div class="text-red-500 flex items-center justify-center">
      <p>An error occurred during conversion:</p>
    </div>
    <p class="mt-2 text-red-600">{errorMessage}</p>
  {/if}
</div>