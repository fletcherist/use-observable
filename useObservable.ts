import { useEffect, useState } from 'react';
import { observable } from 'mobx'
import { deepObserve } from 'mobx-utils'

export function useObservable<T>(value: T): T {
  const [flag, forceUpdate] = useState(false)
  useEffect(() => {
    const dispose = deepObserve(value, () => forceUpdate(!flag))
    return () => dispose()
  }, [flag])
  return value
}
