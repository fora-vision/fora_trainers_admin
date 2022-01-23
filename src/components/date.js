export const formatDate = (date) => {
  return new Date(date).toLocaleString("ru", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getMonday = (d) => {
  d = new Date(d);
  const day = d.getDay();
  const diff = d.getDate() - day + (day == 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};

export const formatSecs = (secs) => {
  const mm = Math.round(secs / 60);
  const ss = Math.round(secs % 60);

  return `${mm < 10 ? "0" + mm : mm}:${ss < 10 ? "0" + ss : ss}`;
};
