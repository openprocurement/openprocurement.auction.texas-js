
<template>
  <svg class="loader" version="1.1" x="0px" y="0px"
       width="27" height="27" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
    <image x="1" y="1" width="50" height="50" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAYCAQAAAClvJ5NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQfiCRoMAB3P8FAeAAABPElEQVQ4y52TrUuDURSHn80x50BcsZksptmGfWVFRPwXTIJBLGoxGMS4v0C0mRcNgiD4BYpFEEUsfgRRhqggyGNwvnund/PV3y0H7u+599x7zklJQEUmgQeWQpsYWuOqXgX3SEdsgYT6Qoqcs5CQEbHko6orSRLLAHDLNQVgjl6mkTonwE2nW7DfIz81Gz67uZphn3tqzVxyBPPOm/0NkJQJv6mpDDNRfMpmG1c3U1F8jE2ttU2mEHNV0/xZGdajeKet6y3mOvjH8+OJpagEPQMMh6qPXa6qyz+ePuiFdUd+ljLrRuNHZlqArJeqPltuRXLWGsCWebFo1aqLIo76ouqrY3Gk4ruqNXsCzV/2SdV90/HEJnxzI+qw7/MyYt1d+763ZcmuDrM/ZL51xAAOOxbjLF79kO7ZBu7C9AfRVY2zfsYSNwAAAABJRU5ErkJggg=="/>
  </svg>
</template>

<script>
export default {

}
</script>

<style>
.loader {
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 2s infinite linear;
  animation: load8 2s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>