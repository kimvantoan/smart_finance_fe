/* yyyy-MM-dd cho input */
export const toInputDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return local.toISOString().split("T")[0];
  };
  
  /* yyyy-MM-dd để gửi backend */
  export const toBackendDate = (inputDate: string) => {
    // inputDate đã là yyyy-MM-dd
    return inputDate;
  };
  
  /* format để hiển thị */
  export const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("vi-VN");
  };
  const parseDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d); // local date, không lệch
  };
  
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
  
 export const formatDateHeader = (dateStr: string) => {
    const date = parseDate(dateStr);
    const today = new Date();
  
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
  
    if (isSameDay(date, today))
      return { label: "HÔM NAY", right: "Hôm nay" };
  
    if (isSameDay(date, yesterday))
      return { label: "HÔM QUA", right: "Hôm qua" };
  
    return {
      label: date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      right: date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
      }),
    };
  };
  