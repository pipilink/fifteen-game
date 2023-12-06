export function formatTime(timeInCentiSeconds: number) {
  let minutes: any = Math.floor(timeInCentiSeconds / 6000);
  let seconds: any = Math.floor((timeInCentiSeconds % 6000) / 100);
  let centiSeconds: any = timeInCentiSeconds % 100;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  if (centiSeconds < 10) {
    centiSeconds = `0${centiSeconds}`;
  }

  return `${minutes}:${seconds}.${centiSeconds}`;
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
