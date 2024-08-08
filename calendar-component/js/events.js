export const fetch_events = async () => {
    const url = "http://localhost:8081/api/v1/events/events";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json
    } catch (error) {
        console.error(error.message);
    }


}
const save_events = () => {}