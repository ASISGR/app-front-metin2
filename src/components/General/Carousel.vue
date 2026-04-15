<template>
  <a-carousel autoplay arrows>
    <template #prevArrow>
      <div class="custom-slick-arrow" style="left: 14px; z-index: 2">
        <left-circle-outlined />
      </div>
    </template>

    <template #nextArrow>
      <div class="custom-slick-arrow" style="right: 14px; z-index: 2">
        <right-circle-outlined />
      </div>
    </template>

    <div v-for="(image, index) in images" :key="index">
      <div class="carousel-slide">
        <img :src="image" alt="" class="carousel-image" />
        <div class="carousel-overlay"></div>
      </div>
    </div>
  </a-carousel>
</template>

<script lang="ts" setup>
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue'

import carousel1 from '@/assets/images/carousel/carousel1.jpg'
import carousel2 from '@/assets/images/carousel/carousel2.jpg'
import carousel3 from '@/assets/images/carousel/carousel3.jpg'
import carousel4 from '@/assets/images/carousel/carousel4.jpg'

const images = [carousel1, carousel2, carousel3, carousel4]
</script>

<style scoped>
:deep(.slick-slide) {
  overflow: hidden;
  border-radius: 1rem;
}

.carousel-slide {
  position: relative;
  height: 400px;
  overflow: hidden;
  border-radius: 1rem;
  background: #0f172a;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* Το βασικό layer που “δένει” όλες τις εικόνες */
.carousel-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(to bottom, rgba(2, 6, 23, 0.55) 0%, rgba(2, 6, 23, 0.18) 30%, rgba(2, 6, 23, 0.18) 70%, rgba(2, 6, 23, 0.6) 100%),
    linear-gradient(to right, rgba(2, 6, 23, 0.3) 0%, rgba(2, 6, 23, 0.08) 20%, rgba(2, 6, 23, 0.08) 80%, rgba(2, 6, 23, 0.3) 100%);
  box-shadow: inset 0 0 120px rgba(2, 6, 23, 0.35);
}

/* Βελάκια */
:deep(.slick-arrow.custom-slick-arrow) {
  width: 38px;
  height: 38px;
  font-size: 38px;
  color: #fff;
  background: rgba(15, 23, 42, 0.35);
  border-radius: 9999px;
  transition: all 0.25s ease;
  opacity: 0.75;
  z-index: 2;
}

:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}

:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #ffffff;
  opacity: 1;
  transform: scale(1.08);
  background: rgba(30, 41, 59, 0.65);
}
</style>