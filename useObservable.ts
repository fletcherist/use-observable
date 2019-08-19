import { useEffect, useState } from 'react';
import { observable, isObservable } from 'mobx'
import { deepObserve } from 'mobx-utils'

export function useObservable<T>(value: T): T {
  if (!isObservable(value)) {
    throw new TypeError(`Expected observable, but got: ${typeof value}`)
  }
  const [flag, forceUpdate] = useState(false)
  useEffect(() => {
    const dispose = deepObserve(value, () => forceUpdate(!flag))
    return () => dispose()
  }, [flag])
  return value
}
