<template>
  <div style="width: 500px">
    <h2>Σημαντικά νέα</h2>
    <div class="tab-panel">
      <ul>
        <li class="tab-item">
          <h3>fewqfewqfewqfewqfewqfweqf</h3>

          <ul class="meta-info">
            <li>date</li>
            <li>&middot;</li>
            <li>comments</li>
            <li>&middot;</li>
            <li>shares</li>
          </ul>

          <a href="#" class="overlay"></a>
        </li>
        <li class="tab-item">
          <h3>fewqfewqfeqwfewqfewqfewqfeqwfewqfqwe</h3>

          <ul class="meta-info">
            <li>date</li>
            <li>&middot;</li>
            <li>comments</li>
            <li>&middot;</li>
            <li>shares</li>
          </ul>

          <a href="#" class="overlay"></a>
        </li>
        <li class="tab-item">
          <h3>fqwefxdcsaffvasgrtegqewrfwqf</h3>

          <ul class="meta-info">
            <li>date</li>
            <li>&middot;</li>
            <li>comments</li>
            <li>&middot;</li>
            <li>shares</li>
          </ul>

          <a href="#" class="overlay"></a>
        </li>
        <li class="tab-item">
          <h3>title</h3>

          <ul class="meta-info">
            <li>date</li>
            <li>&middot;</li>
            <li>comments</li>
            <li>&middot;</li>
            <li>shares</li>
          </ul>

          <a href="#" class="overlay"></a>
        </li>
        <li class="tab-item">
          <h3>title</h3>

          <ul class="meta-info">
            <li>date</li>
            <li>&middot;</li>
            <li>comments</li>
            <li>&middot;</li>
            <li>shares</li>
          </ul>

          <a href="#" class="overlay"></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
/* Styles for the container */

/* Styles for the tab panel */
.tab-panel {
  border-radius: 0.375rem;
  background-color: #ffffff;
  padding: 0.75rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  outline: none;
  border: none;
}

/* Styles for the tab item */
.tab-item {
  position: relative;
  border-radius: 0.375rem;
  padding: 0.5rem;
  cursor: pointer;
  list-style-type: none;
}

.tab-item:hover {
  background-color: #f5f5f5;
}

/* Styles for the title */
.tab-item h3 {
  font-size: 0.875rem;
  font-weight: 800;
  line-height: 1.25rem;
}

/* Styles for the metadata */
.meta-info > li {
  display: inline-block;
  margin-right: 0.25rem;
  font-size: 0.75rem;
  font-weight: normal;
  line-height: 1rem;
  color: #777777;
}

.meta-info > li:last-child {
  margin-right: 0;
}

/* Styles for the overlay link */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0.375rem;
  outline: none;
  border: none;
}
</style>
