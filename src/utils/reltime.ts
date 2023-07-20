import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "@/utils/delocale";

export const relTimeFromNow = (date: Date): string => {
  return dayjs(date ?? new Date()).fromNow();
};
