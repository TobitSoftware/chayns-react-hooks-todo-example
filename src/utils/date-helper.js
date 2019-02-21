const getMonthName = month => ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'][month];

export default function formatDateMonthYearHoursMinutes(ts) {
    if (!ts) {
        return null;
    }

    const date = new Date(ts).getDate();
    const month = getMonthName(new Date(ts).getMonth());
    const year = new Date(ts).getFullYear();
    const hours = new Date(ts).getHours();
    const minutes = new Date(ts).getMinutes();
    return `${date}. ${month} ${year} - ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes} Uhr`;
}
