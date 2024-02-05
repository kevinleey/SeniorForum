export function timeSince(dateString) {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date() - date) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  let counter;
  for (const unit in intervals) {
    counter = Math.floor(seconds / intervals[unit]);
    if (counter > 0) {
      return counter === 1
        ? counter + " " + unit + " ago"
        : counter + " " + unit + "s ago";
    }
  }

  return "Just now";
}
