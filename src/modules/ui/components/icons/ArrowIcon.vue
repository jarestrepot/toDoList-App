<script>
  export default {
    props: {
      rotateIcon: String
    }
  }
</script>

<template>
  <svg 
    :class="rotateIcon ?? 'rotate-0'"
    class="w-4 h-4 pt-1 origin-center" 
    viewBox="0 0 24 24" 
    fill="#64748b">
    <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
  </svg>
</template>