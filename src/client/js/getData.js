/* Function called by event listener */
export async function getData(urL) {
    try {
        const response = await fetch(urL);
        const input = await response.json();
        console.log(input);
        return input;
    } catch (error) {
        console.log(error);
    }
}
