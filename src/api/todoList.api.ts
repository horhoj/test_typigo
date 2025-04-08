import type { Todo, TodoDoneStatusData } from '@/api/todoList.types'
import { delay } from '@/helpers/delay'
import { memoize } from '@/helpers/memoize'

const currentDelay = async () => delay(300)

const TODO_DONE_STATUS_DATA_LS = 'TODO_DONE_STATUS_DATA_LS'

const getTodoDoneStatusFromLS = () =>
  JSON.parse(
    localStorage.getItem(TODO_DONE_STATUS_DATA_LS) ?? '{}'
  ) as TodoDoneStatusData

const saveTodoDoneStatusToLS = (data: TodoDoneStatusData) =>
  localStorage.setItem(TODO_DONE_STATUS_DATA_LS, JSON.stringify(data))

const fetchTodoList = memoize(async () => {
  await currentDelay()
  const res = await fetch('/todo-list.json')
  const todoList = await res.json()

  return todoList as Todo[]
})

export const getTodoList = async () => {
  const todoDoneStatus = getTodoDoneStatusFromLS()
  const todoList = await fetchTodoList()

  return todoList.map((el) => ({
    ...el,
    done: todoDoneStatus[el.id] === undefined ? el.done : todoDoneStatus[el.id]
  }))
}

export const todoChangeDoneStatus = async (id: number) => {
  const todoList = await getTodoList()
  const todo = todoList.find((el) => el.id === id)
  if (todo === undefined) {
    throw new Error('unknown todo id')
  }
  const data = getTodoDoneStatusFromLS()
  data[id] = !todo.done
  saveTodoDoneStatusToLS(data)
}
