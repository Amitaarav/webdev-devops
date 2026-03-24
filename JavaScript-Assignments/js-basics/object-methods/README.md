## Core Idea
Almost every FAANG question on objects/arrays follows this pipeline:

```
    Object → Array → Process → Result
```

1. Transform Pattern
- change structure (Objec <--> Array)

Example:

```js
    Object.entries(obj) // object to Array
    Object.fromEntries() // array to object
    Object.keys()
    Object.value()
```

Use when:
- You need to loop with logic
- You need both key + value

2. Filter Pattern
Remove unwanted data
Template:

```js
    Object.fromEntries(
        Object.entries(obj).filter(([k, v]) => condition)
    );
```

3. REDUCE Pattern
Build something (sum, object, max, grouping)

```js
    Object.entries(obj).reduce((acc, [k, v]) => {
    // logic
        return acc;
    }, initialValue);
```

Use when:
- Sum / average
- Max / min
- Build object
- Grouping

4. NESTED DATA Pattern
Arrays inside object OR object inside object

Template:

```js
    Object.entries(obj).reduce((acc, [key, arr])=>{
        const result = arr.reduce((sum, x) => sum + x, 0);
        acc[k] = result;
        return acc;
    }, {});
```
Use when:
- { A: [1,2], B: [3,4] }
- Deep objects
- Flattening

5. SEARCH / MAX / MIN Pattern (FAANG favorite)
Find best candidate

Template:

```js
    Object.entries(obj).reduce((best, [k, v]) => {
  const score = /* compute something */;

  if (score > best.score) {
    return { key: k, score };
  }

  return best;
}, { key: null, score: -Infinity });
```

Use when:
- Max average
- Most frequent
- Highest score

***Golden Rule***:
If stuck:

```
    Convert object → entries → apply array logic → convert back

    Object → entries → array logic → object
```

```js

const result = Object.fromEntries(
  Object.entries(obj)
    .filter(([key, value]) => {
      // condition
    })
    .map(([key, value]) => {
      // transformation
      return [key, value];
    })
);
```

```
filter → boolean condition  
map → transformation  
reduce → build result
```