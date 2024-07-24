<script setup lang="ts">
import { ref } from 'vue'
import { isMobileTerminal } from '../utils/flexible'

</script>

<template>
  {{ isMobileTerminal ? 'Mobile Terminal' : 'Not Mobile Terminal' }}
</template>