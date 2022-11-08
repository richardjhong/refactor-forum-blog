module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return new Date(date).toLocaleString();
  },
  matchingId: (id1, id2) => {
    return id1 === id2;
  }
};
