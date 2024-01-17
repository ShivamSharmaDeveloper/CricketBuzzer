import moment from "moment";

export const isCrossedCurrentTime = (openTime) => {
    const currentTime = moment();
    const formattedOpenTime = moment(openTime, 'hh:mm A');
    return currentTime.isAfter(formattedOpenTime);
};