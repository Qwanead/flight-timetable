<template>
  <div class="table-controls">
    <BaseButton @click="$emit('edit')">
      Изменить
    </BaseButton>

    <BaseButton @click="$emit('delete')">
      Удалить
    </BaseButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';

export default defineComponent({
  components: {
    BaseButton,
  },
  emits: ['edit', 'delete'],
});
</script>

<style scoped>
  .table-controls {
    display: flex;
    gap: 10px;
  }
</style>
