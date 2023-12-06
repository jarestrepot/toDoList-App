<script>
  export default {
    props: {
      classDiv: String,
      classButtonLanguaje: String,
    }
  }
</script>

<template>
  <div :class="classDiv">
    <button 
      :title="$i18n.locale === 'es' ? 'Idiomas' : 'Languages'"
      :class="classButtonLanguaje ?? 'text-persian-green-500 text-xl font-extrabold rounded-full underline decoration-persian-green-500'"
      @click="$i18n.locale === 'es' ? $i18n.locale = 'en': $i18n.locale = 'es'">
      {{ $i18n.locale === 'es' ? 'EN': 'ES' }}
    </button>
  </div>
</template>