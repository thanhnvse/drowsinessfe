export default async function sendBookingRequest(booking) {
  const res = await window.axios.post('/api/v1/bookings', booking);
  if (res.status > 199 && res.status < 300) {
    return true;
  }
  return false;
}
