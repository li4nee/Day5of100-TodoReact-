export default function getTime() {
    let currentDate = new Date().toLocaleString().split(",")[1];
    return currentDate;
  }
  