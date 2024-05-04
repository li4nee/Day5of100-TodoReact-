export default function getDate() {
  let currentDate = new Date().toLocaleString().split(",")[0];
  return currentDate;
}
