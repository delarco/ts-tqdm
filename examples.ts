import { tqdm } from './src';

async function runExamples() {
    console.log('Fixed iterations');
    for (let _ of tqdm([1, 2, 3, 4, 5, 6])) {
        // do stuff
    }

    console.log('Process in time');
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    for (let _ of tqdm(1000)) {
        await delay(100);
    }
}

runExamples().catch(err => {
    console.error(err);
    process.exit(1);
});
