export const formatDate = (date: Date): string => {
    const timeFormatter = new Intl.DateTimeFormat("da-DK", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const dayFormatter = new Intl.DateTimeFormat("da-DK", {
        weekday: "short",
    });

    const time = timeFormatter.format(date);
    let dayName = dayFormatter.format(date).slice(0, 3);
    dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    return `${time} ${dayName} ${day}.${month}.${year}`;
};
