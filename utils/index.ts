export function convertTimestampToCustomFormat(timestamp: string) {
    // Create a new Date object from the timestamp
    const date = new Date(timestamp);

    // Get the day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    // Get the hours and minutes
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Determine AM/PM and adjust hours
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Adjust for 0 hour to be 12

    // Format hours and minutes
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = minutes;

    // Combine into the final format
    return `${day}.${month}.${year} - ${formattedHours}.${formattedMinutes} ${ampm}`;
}

export function shortenString(str: string) {
    if (str.length <= 5) {
      return str;
    }
    return str.substring(0, 5) + '...';
  }
  
export function getCookie(name: string) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th'; // for 11th, 12th, 13th, etc.
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

export function formatDateString(dateString: string): string {
  const date = new Date(dateString);

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const ordinalSuffix = getOrdinalSuffix(day);
  const month = monthsOfYear[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${dayOfWeek} ${day}${ordinalSuffix} ${month}, ${hours}:${strMinutes} ${ampm}`;
}

const formattedDate = formatDateString('2024-07-01T13:17:23.761Z');
console.log(formattedDate); // Output: Tuesday 1st July, 1:17 pm

