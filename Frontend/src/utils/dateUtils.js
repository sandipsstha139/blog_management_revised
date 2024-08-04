export function formatDate(date) {
  const day = date.getDate();
  const daySuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formattedDay = `${day}${daySuffix(day)}`;

  const month = date.toLocaleString("default", { month: "short" });
  const weekday = date.toLocaleString("default", { weekday: "long" });

  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0"); 
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${formattedDay} ${month}, ${weekday} ${formattedHours}:${minutes} ${ampm}`;
}
