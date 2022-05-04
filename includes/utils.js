/**
 * Common utility functions.
 *
 * Reusable functions that can be imported into other files, mostyl date functions at this stage.
 * 
 * @file   Common utility functions
 * @author LeanCTO
 * @since  1.0.0
 * @copyright (c) 2022 All rights reserved.
 * 
 */
const getCurrentTimestamp = () => {
    let current = new Date();
    let cDate = current.toISOString().split('T')[0];
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    let dateTime = cDate + ' ' + cTime;
    return dateTime;
};

const daysDiff = (start, end) => {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // convert ms to hours
    const oneHour = oneDay / 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    // Calculating the no. of hours between two dates
    const diffInHours = Math.round(diffInTime / oneHour)

    return {
        numDays: diffInDays,
        numHours: diffInHours,
        numMs: diffInTime
    };
}

module.exports = {
    getCurrentTimestamp,
    daysDiff
};