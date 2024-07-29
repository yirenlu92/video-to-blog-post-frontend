<script lang="ts">
    import { marked } from 'marked';
    import { onMount } from 'svelte';
  
    export let markdownContent: string = '';
    
    let activeTab: 'raw' | 'rendered' = 'raw';
    let renderedContent: string = '';
  
    onMount(() => {
      renderedContent = marked(markdownContent);
    });
  
    $: {
      renderedContent = marked(markdownContent);
    }
  
    function setActiveTab(tab: 'raw' | 'rendered') {
      activeTab = tab;
    }
  </script>
  
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-semibold mb-4">Generated Markdown</h2>
    
    <div class="mb-4">
      <button
        class="px-4 py-2 mr-2 rounded-t-lg {activeTab === 'raw' ? 'bg-gray-200 font-semibold' : 'bg-gray-100'}"
        on:click={() => setActiveTab('raw')}
      >
        Raw Markdown
      </button>
      <button
        class="px-4 py-2 rounded-t-lg {activeTab === 'rendered' ? 'bg-gray-200 font-semibold' : 'bg-gray-100'}"
        on:click={() => setActiveTab('rendered')}
      >
        Rendered Markdown
      </button>
    </div>
  
    <div class="border rounded-lg p-4">
      {#if activeTab === 'raw'}
        <pre class="whitespace-pre-wrap break-words"><code>{markdownContent}</code></pre>
      {:else}
        <div class="prose max-w-none">
          {@html renderedContent}
        </div>
      {/if}
    </div>
  
    <button
      on:click={() => navigator.clipboard.writeText(markdownContent)}
      class="mt-4 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300"
    >
      Copy Raw Markdown
    </button>
  </div>
  
  <style>
    /* These styles are for the prose class, which formats the rendered Markdown */
    :global(.prose) {
      max-width: 65ch;
      color: #374151;
    }
    :global(.prose p) {
      margin-top: 1.25em;
      margin-bottom: 1.25em;
    }
    :global(.prose strong) {
      font-weight: 600;
    }
    :global(.prose ul) {
      margin-top: 1.25em;
      margin-bottom: 1.25em;
      padding-left: 1.625em;
    }
    :global(.prose li) {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }
    :global(.prose > ul > li p) {
      margin-top: 0.75em;
      margin-bottom: 0.75em;
    }
    :global(.prose h1, .prose h2, .prose h3, .prose h4) {
      color: #111827;
      font-weight: 600;
      line-height: 1.25;
    }
    :global(.prose h1) {
      font-size: 2.25em;
      margin-top: 0;
      margin-bottom: 0.8888889em;
      line-height: 1.1111111;
    }
    :global(.prose h2) {
      font-size: 1.5em;
      margin-top: 2em;
      margin-bottom: 1em;
      line-height: 1.3333333;
    }
    :global(.prose a) {
      color: #2563eb;
      text-decoration: underline;
      font-weight: 500;
    }
  </style>