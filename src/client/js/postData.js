/* Function to POST data */
export async function postData(url = '', data = {}) {
    try {
        const info = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(data)
        });
        return info;
    } catch (error) {
        console.log(error);
    }
}
