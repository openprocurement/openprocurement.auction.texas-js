<template>
  <div>
    {{ $t("Not Found") }}
  </div> 
</template>

<script>
export default {
  created() {
    document.title = '-'
  }
}
</script>
