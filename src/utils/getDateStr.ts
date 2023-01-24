const formateDate = (dateNum: number) => {
  const toLengthTwo = (str: number) => {
    let stirng = String(str);
    stirng = stirng.length === 1 ? `0${stirng}` : stirng;
    return stirng;
  };

  const targetDate = new Date(dateNum);
  const YYYY = targetDate.getFullYear();
  const MM = toLengthTwo(targetDate.getMonth() + 1);
  const DD = toLengthTwo(targetDate.getDate());
  const hh = toLengthTwo(targetDate.getHours());
  const mm = toLengthTwo(targetDate.getMinutes());

  return {
    YYYY, MM, DD, hh, mm,
  };
};

const getDateStr = (dateNum: number, withoutTime = false) => {
  const {
    YYYY, MM, DD, hh, mm,
  } = formateDate(dateNum);

  return withoutTime ? `${DD}.${MM}.${YYYY}` : `${DD}.${MM}.${YYYY} ${hh}:${mm}`;
};

export const getTimeStr = (dateNum: number) => {
  const { hh, mm } = formateDate(dateNum);

  return `${hh}:${mm}`;
};

export default getDateStr;
