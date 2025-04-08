<script setup lang="ts">
import TodoList from '@/features/todos/components/TodoList.vue'
import { useRequest } from '@/hooks/useRequest'
import { getTodoList, todoChangeDoneStatus } from '@/api/todoList.api'
import { computed, onMounted } from 'vue'
import Spinner from '@/ui/Spinner.vue'

const {
  response: fetchTodoListResponse,
  run: fetchTodoListRun,
  isLoading: fetchTodoListIsLoading
} = useRequest(getTodoList)

onMounted(fetchTodoListRun)

const { run: doneChangeStatusRun, isLoading: doneChangeStatusIsLoading } =
  useRequest(async (id: number) => {
    await todoChangeDoneStatus(id)
    await fetchTodoListRun()
    return null
  })

const isLoading = computed(
  () => fetchTodoListIsLoading.value || doneChangeStatusIsLoading.value
)

const handleCheck = (id: number) => {
  doneChangeStatusRun(id)
}
</script>

<template>
  <Spinner :is-show="isLoading" />
  <div class="todo-list-view">
    <div class="todo-list-view__title">TODO LIST</div>
    <TodoList
      :todo-list="fetchTodoListResponse"
      v-if="fetchTodoListResponse"
      @on-check="handleCheck"
    />
    <div v-if="isLoading">is loading...</div>
  </div>
</template>

<style lang="css" scoped>
.todo-list-view {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.todo-list-view__title {
  font-weight: 500;
  text-align: center;
}
</style>
