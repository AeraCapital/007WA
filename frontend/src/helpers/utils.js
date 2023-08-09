export const isToday = (date, now) => {
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
};

export const isYesterday = (date, now) => {
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
};

export const formatTimestamp = (timestamp) => {
  const dateObject = new Date(timestamp * 1000);
  const now = new Date();

  const options12Hour = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  if (isToday(dateObject, now)) {
    return dateObject.toLocaleString("en-US", options12Hour);
  } else if (isYesterday(dateObject, now)) {
    return `Yesterday ${dateObject.toLocaleString("en-US", options12Hour)}`;
  } else {
    const optionsDate = {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return dateObject.toLocaleString("en-US", optionsDate);
  }
};

export const formatMobileNumber = (number) => {
  if (number && typeof number === "string" && number.length >= 10) {
    const countryCode = number.substring(0, 3);
    const restOfNumber = number.substring(3);

    return `${countryCode} ${restOfNumber}`;
  }
  return number;
};
