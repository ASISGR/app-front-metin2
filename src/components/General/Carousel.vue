<template>
  <a-carousel autoplay arrows>
    <template #prevArrow>
      <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
        <left-circle-outlined />
      </div>
    </template>
    <template #nextArrow>
      <div class="custom-slick-arrow" style="right: 10px">
        <right-circle-outlined />
      </div>
    </template>

    <div>
      <img src="@/assets/images/carousel/carousel1.png" alt="" />
    </div>
    <div>
      <img src="@/assets/images/carousel/carousel2.png" alt="" />
    </div>
    <div>
      <img src="@/assets/images/carousel/carousel3.png" alt="" />
    </div>
    <div>
      <img src="@/assets/images/carousel/carousel4.png" alt="" />
    </div>
  </a-carousel>
</template>
<script lang="ts" setup>
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
</script>

<style scoped>
/* For demo */
:deep(.slick-slide) {
  text-align: center;
  height: 400px;
  line-height: 300px;
  background: #364d79;
  overflow: hidden;
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  transition: ease all 0.3s;
  opacity: 0.3;
  z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #fff;
  opacity: 0.5;
}

:deep(.slick-slide h3) {
  color: #fff;
}
img {
  height: auto;
  width: 100%;
}
</style>
