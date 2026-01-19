export const formatNumber = (value: number | string) => {
    if (value === "" || value === null || value === undefined) return "";
    const num = Number(value);
    if (isNaN(num)) return "";
    return num.toLocaleString("en-US"); // hoặc "vi-VN"
  };
  
export  const parseNumber = (value: string) => {
    return Number(value.replace(/,/g, ""));
  };
  