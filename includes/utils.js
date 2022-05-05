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

    // convert ms to weeks
    const oneWeek = oneDay * 7;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Convert to days
    const diffInDays = Math.floor(diffInTime / oneDay);

    // Convert to hours
    const diffInHours = Math.floor(diffInTime / oneHour);

    // Convert to weeks
    const diffInWeeks = Math.floor(diffInTime / oneWeek);

    return {
        numDays: diffInDays,
        numHours: diffInHours,
        numWeeks: diffInWeeks,
        numMs: diffInTime
    };
}

module.exports = {
    getCurrentTimestamp,
    daysDiff
};