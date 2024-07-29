<script>
    import { createEventDispatcher } from 'svelte';
  
    export let youtubeUrl = '';
    const dispatch = createEventDispatcher();
  
    function handleSubmit() {
      dispatch('convert');
    }
  </script>
  
  <div class="mb-8">
    <input
      type="text"
      bind:value={youtubeUrl}
      placeholder="Enter YouTube URL"
      class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      on:click={handleSubmit}
      class="mt-4 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
    >
      Convert to Markdown
    </button>
  </div>
  