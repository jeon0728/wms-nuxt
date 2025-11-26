<template>
  <div>
    <header class="bg-gray-800 text-white p-4">
      <div class="container mx-auto flex justify-between">
        <div class="font-bold">Mini WMS</div>
        <nav class="flex gap-4">
          <NuxtLink to="/" class="hover:underline">Dashboard</NuxtLink>
          <NuxtLink to="/inbound" class="hover:underline">Inbound</NuxtLink>
          <NuxtLink to="/inventory" class="hover:underline">Inventory</NuxtLink>
          <NuxtLink to="/outbound" class="hover:underline">Outbound</NuxtLink>
        </nav>
      </div>
    </header>
    <main class="container mx-auto mt-6">
      <slot />
    </main>
  </div>
</template>
