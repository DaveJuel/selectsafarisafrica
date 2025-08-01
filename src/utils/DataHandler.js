import { parseISO, addDays, format } from 'date-fns';

export const sortItineraryActivities = (itinerary, allActivities) => {
    const timeOrder = [
        "Early morning",
        "Mid morning",
        "Late morning",
        "Midday",
        "Early afternoon",
        "Late afternoon",
        "Sunset",
        "Evening",
        "Night",
        "Midnight",
    ];

    const timeRank = timeOrder.reduce((acc, time, index) => {
        acc[time.toLowerCase()] = index;
        return acc;
    }, {});

    return allActivities
        ?.filter((activity) => activity.itinerary === itinerary.name)
        ?.sort((a, b) => {
        if (a.day !== b.day) return a.day - b.day;

        const timeA = timeRank[a.time?.toLowerCase()] ?? Infinity;
        const timeB = timeRank[b.time?.toLowerCase()] ?? Infinity;

        return timeA - timeB;
    });
}

export const getFormattedTripDate = (tripStartDate, day) => {
  if (!tripStartDate || !day) return '';

  const startDate = parseISO(tripStartDate);
  const currentDate = addDays(startDate, day - 1);

  return format(currentDate, 'EEEE, dd MMMM yyyy');
};

export const getTodayDateISO = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};