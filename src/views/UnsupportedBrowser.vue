<template>
  <div class="unsupported-browser-page">
    <p class="unsupported-browser-page_text">
      {{ $t ('Your browser is out of date, and this site may not work properly.') }}
    </p>
    <a class="unsupported-browser-page_link" :href="`http://browser-update.org/${$store.state.i18n.locale}/update.html`" target="_blank">
      {{ $t('Learn how to update your browser.') }}
    </a>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.unsupported-browser-page{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: lightgray;
    z-index: 4;
    text-align: center
}

.unsupported-browser-page_text{
    margin-top: 100px;
}

.unsupported-browser-page_link{
    color: rgb(234, 4, 4);
    text-decoration: underline;
}
</style>