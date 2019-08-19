# use-observable

Simpler alternative to [mobx-react-lite](https://github.com/mobxjs/mobx-react-lite)

### motivation
the problem of state management still exists. while using mobx i was working with overrated package `mobx-react-lite`


i don't understand why `mobx-react-lite` has such feature as `useObserver`.
in my mind `useObserver` seems to be useless thing. all react bindings for mobx should be replaced with the following function:
```ts
function useObservable<T>(value: T): T {
  const [flag, forceUpdate] = useState(false)
  useEffect(() => {
    const dispose = deepObserve(value, () => forceUpdate(!flag))
    return () => dispose()
  }, [flag])
  return value
}
```

1. it works with both global state/local states
2. no need to use strange thing `useObserver`
3. works both inside/outside of react code

# Install
[go here and copy source file (12 lines) to your project](https://github.com/fletcherist/use-observable/blob/master/useObservable.ts) (because package managers sucks)

# Usage
```ts
import { observable } from 'mobx'
import { useObservable } from './useObservable'
const myState = observable({
  count: 1,
  foo: { bar: { baz: 123 } },
  increment() {
    this.count += 1
  },
  decrementBaz() {
    this.foo.bar.baz -= 1
  }
});
setTimeout(() => {
  // this will update your component
  // because its subscribed to myState by using `useObservable`
  myState.count += 42
}, 1000)
const App: React.FC = () => {
  const state = useObservable(myState)
  return (
    <div>
        <p>count: {state.count}</p>
        <p>baz: {state.foo.bar.baz}</p>
        <button onClick={() => state.increment() }>increment counter</button>
        <button onClick={() => myState.decrementBaz() }>decrement baz</button>
    </div>
  );
}
```
