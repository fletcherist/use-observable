# use-observable

Simple alternative to [mobx-react-lite](https://github.com/mobxjs/mobx-react-lite)

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
copy sources and put it into your utils (or maybe place where you work with app store)

# Usage
```ts
import { useObservable } from './useObservable'
const counter = observable({
  count: 1,
  foo: { bar: { baz: 123 } },
  increment() {
    this.count += 1
  },
  decrementBaz() {
    this.foo.bar.baz -= 1
  }
});
const App: React.FC = () => {
  const state = useObservable(counter)
  return (
    <div>
        <p>count: {state.count}</p>
        <p>baz: {state.foo.bar.baz}</p>
        <button onClick={() => state.increment() }>increment counter</button>
        <button onClick={() => counter.decrementBaz += 1}>decrement baz</button>
    </div>
  );
}
```
