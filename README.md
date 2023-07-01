# ts-tqdm
A tqdm for node (Typescript).

## Installation

### npm

```cmd
npm install ts-tqdm
```

### source

```cmd
npm install https://github.com/delarco/ts-tqdm.git
```

## Usage

Import `ts-tqdm`

```ts
import { tqdm } from "ts-tqdm"
```

Array:

```ts
for (let item of tqdm([1, 2, 3, 4, 5, 6])) {
    // do stuff
}
```

Fixed iterations:

```ts
for (let item of tqdm(1000)) {
    // do stuff
}
```

### Example

```ts
import { tqdm } from "ts-tqdm"

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {

    for (let _ of tqdm(1000)) {

        await delay(100);
    }
})();
```