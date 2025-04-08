<script setup lang="ts">
import type { Todo } from '@/api/todoList.types'
import classNames from 'classnames'

const props = defineProps<{ todoList: Todo[] }>()

const emit = defineEmits<{ (e: 'onCheck', id: number): void }>()
</script>

<template>
  <ul class="todo-list">
    <li v-for="todo in props.todoList" :key="todo.id" class="todo-list-item">
      <button
        :class="classNames('todo-list-item__checkbox', todo.done && 'checked')"
        @click="emit('onCheck', todo.id)"
      />
      <span
        :class="
          classNames('todo-list-item__checkbox-label', todo.done && 'checked')
        "
      >
        {{ todo.title }}
      </span>
    </li>
  </ul>
</template>

<style scoped>
.todo-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.todo-list-item {
  border: 1px solid var(--border-color);
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.todo-list-item__checkbox-label {
  color: var(--main-color);
}

.todo-list-item__checkbox-label.checked {
  color: var(--disabled-color);
  text-decoration: line-through;
}

.todo-list-item__checkbox {
  width: 30px;
  height: 30px;
  cursor: pointer;
  background-color: var(--main-background);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  outline: none;
}
.todo-list-item__checkbox.checked {
  background-color: var(--secondary-background);
  color: var(--secondary-color);
  border: none;
}
</style>
