import { Dispatch } from 'react'
import { ReducerAction } from '../types/reducer'

const accurateTimer = (dispatch: Dispatch<ReducerAction>, action: ReducerAction, time: number): { cancel: () => void } => {
  let nextAt: number, timeout: ReturnType<typeof setTimeout>

  nextAt = new Date().getTime() + time

  const wrapper = (): void => {
    nextAt += time
    timeout = setTimeout(wrapper, nextAt - new Date().getTime())
    dispatch(action)
  }

  const cancel = (): void => clearTimeout(timeout)

  timeout = setTimeout(wrapper, nextAt - new Date().getTime())

  return { cancel }
}

export default accurateTimer
