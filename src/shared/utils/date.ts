import type { TFunction } from "i18next";

/* yyyy-MM-dd cho input */
export const toInputDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return local.toISOString().split("T")[0];
  };
  
  /* yyyy-MM-dd để gửi backend */
  export const toBackendDate = (inputDate: string) => {
    return inputDate;
  };
  
  export const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("vi-VN");
  };
  const parseDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d); 
  };
  
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
  
 export const formatDateHeader = (dateStr: string,t:TFunction,lang: string) => {
    const date = parseDate(dateStr);
    const today = new Date();
  
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
  
    if (isSameDay(date, today))
      return { label: t("common.today"), right: t("common.today") };
  
    if (isSameDay(date, yesterday))
      return { label: t("common.yesterday"), right: t("common.yesterday") };
  
    return {
      label: date.toLocaleDateString(lang, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      right: date.toLocaleDateString(lang, {
        day: "2-digit",
        month: "2-digit",
      }),
    };
  };
  