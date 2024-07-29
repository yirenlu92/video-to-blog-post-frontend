<script>
  import "../app.css";
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
  </script>
  
  <Header />
  <main class="flex-grow container mx-auto px-4 py-8">
    <slot />
  </main>
  <Footer />
  
  <style>
    :global(body) {
      font-family: 'Inter', sans-serif;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    main {
      flex: 1;
    }
  </style>