export interface Todo {
  id: number
  title: string
  done: boolean
}

export type TodoDoneStatusData = Record<number, boolean>
