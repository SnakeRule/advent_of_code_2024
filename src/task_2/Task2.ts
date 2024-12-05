import { readTextFile } from "../shared/shared";

export async function Task2() {
    const content = (await readTextFile('./src/task_2/input.txt')).split(/[\n]+/)
    console.log(content[1])
}