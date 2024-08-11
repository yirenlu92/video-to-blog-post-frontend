<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { Upload, Video, X } from 'lucide-svelte';
  
    const dispatch = createEventDispatcher<{ upload: File }>();
  
    let dragOver = false;
    let videoFile: File | null = null;
    let videoPreviewUrl: string | null = null;
    let error: string | null = null;
  
    const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
  
    function handleDragOver(event: DragEvent) {
      event.preventDefault();
      dragOver = true;
    }
  
    function handleDragLeave() {
      dragOver = false;
    }
  
    function handleDrop(event: DragEvent) {
      event.preventDefault();
      dragOver = false;
      handleFiles(event.dataTransfer?.files);
    }
  
    function handleFileInput(event: Event) {
      const input = event.target as HTMLInputElement;
      handleFiles(input.files);
    }
  
    function handleFiles(files: FileList | null) {
      if (files && files[0]) {
        const file = files[0];
        if (file.type.startsWith('video/')) {
          if (file.size <= MAX_FILE_SIZE) {
            videoFile = file;
            videoPreviewUrl = URL.createObjectURL(file);
            error = null;
            dispatch('upload', file);
          } else {
            error = 'File size exceeds 100MB limit.';
          }
        } else {
          error = 'Please upload a valid video file.';
        }
      }
    }
  
    function clearVideo() {
      videoFile = null;
      videoPreviewUrl = null;
      error = null;
    }
  </script>
  
  <div
    class="w-full p-6 border-2 border-dashed rounded-lg {dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}"
    on:dragover={handleDragOver}
    on:dragleave={handleDragLeave}
    on:drop={handleDrop}
  >
    {#if videoFile}
      <div class="space-y-4">
        <video src={videoPreviewUrl} controls class="w-full max-h-64 object-contain"></video>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500">{videoFile.name} ({(videoFile.size / 1024 / 1024).toFixed(2)} MB)</span>
          <button
            on:click={clearVideo}
            class="text-red-500 hover:text-red-700 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    {:else}
      <label for="video-upload" class="flex flex-col items-center justify-center h-64 cursor-pointer">
        <Upload size={48} class="text-gray-400 mb-4" />
        <span class="text-gray-500">Drag and drop your video here or click to browse</span>
        <input
          id="video-upload"
          type="file"
          accept="video/*"
          on:change={handleFileInput}
          class="hidden"
        />
      </label>
    {/if}
  </div>
  
  {#if error}
    <p class="mt-2 text-red-500 text-sm">{error}</p>
  {/if}
  
  <p class="mt-2 text-gray-500 text-sm">Maximum file size: 100MB</p>