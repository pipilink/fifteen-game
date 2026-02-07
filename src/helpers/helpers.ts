const pad = (value: number) => value.toString().padStart(2, '0');

export function formatTime(timeInCentiSeconds: number): string {
    const minutes = Math.floor(timeInCentiSeconds / 6000);
    const seconds = Math.floor((timeInCentiSeconds % 6000) / 100);
    const centiSeconds = timeInCentiSeconds % 100;

    return `${pad(minutes)}:${pad(seconds)}.${pad(centiSeconds)}`;
}

export function convertToCentiSeconds(timeInMilliseconds: number) {
    return Math.round(timeInMilliseconds * 0.1);
}

export function formatDate(timestamp: number) {
    const date = new Date(timestamp);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}
