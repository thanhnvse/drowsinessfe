function getDateTimeString(milisecond) {
  const date = new Date(milisecond);
  const d = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${d}/${month}/${year} ${hour}:${minute}`;
}
async function sendBookingNotification(booking) {
  const vendor = booking.vendor.firebaseToken;
  const content = {
    to: vendor.firebaseToken,
    priority: 'high',
    notification: {
      title: 'Bạn có một booking mới!',
      body: getDateTimeString(booking.meetTime),
      // click_action: "https://google.com",
      icon: booking.renter.avatar,
    },
    data: {
      bookingId: booking.bookingId,
      renterName: booking.renter.username,
      time: booking.meetTime,
    },
  };

  const res = await window.axios.post('/api/v1/notification/token', content);
  return res.status === 200;
}

export default {
  sendBookingNotification,
};
