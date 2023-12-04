<script>
  export default {
    props:{
      className: String
    }
  }
</script>
<template>
  <svg 
    viewBox="0 0 21 21" 
    class="w-5 h-5" 
    stroke-width="1.5">
    <g 
      fill="none" 
      fill-rule="evenodd" 
      transform="translate(3 3)">
      <path
        d="m2.5.5h10c1.1045695 0 2 .8954305 2 2v10c0 1.1045695-.8954305 2-2 2h-10c-1.1045695 0-2-.8954305-2-2v-10c0-1.1045695.8954305-2 2-2z"
        :stroke="className ?? '#86bcf3'" 
        stroke-linecap="round" 
        stroke-linejoin="round" />
        <g fill="currentColor">
          <circle cx="7.5" cy="7.5" r="1" transform="matrix(-1 0 0 1 15 0)" :fill="className ?? '#86bcf3'"/>
          <circle cx="3.5" cy="7.5" r="1" :fill="className ?? '#86bcf3'"/>
          <circle cx="11.5" cy="7.5" r="1" :fill="className ?? '#86bcf3'"/>
        </g>
    </g>
  </svg>
</template>