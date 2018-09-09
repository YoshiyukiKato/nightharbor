# target-loader
TargetLoader is class to load target list asynchronously.  
Example Loaders as follows:

## HttpTargetLoader

```js


class SimpleTargetLoader {
  load(){
    return Promise.resolve();
  }
}
```