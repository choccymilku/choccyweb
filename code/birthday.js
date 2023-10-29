// splice into day, month, year
const bdayArr = birthday.split(", ");
const day = parseInt(bdayArr[0], 10);
const month = parseInt(bdayArr[1], 10);
const year = parseInt(bdayArr[2], 10);

// get current dates
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();

// check if birthday has passed
if (currentDay > day) {
    // birthday has passed
    var age = currentYear - year;
    var nextAge = age + 1;
} else {
    // birthday has not passed
    var age = currentYear - year + 1;
    var nextAge = age + 1;
}

// calculate the next birthday
const nextBirthday = new Date(currentYear, month - 1, day);
if (nextBirthday < new Date(currentYear, currentMonth - 1, currentDay)) {
    // If the next birthday is in the past, calculate for the next year
    nextBirthday.setFullYear(currentYear + 1);
}

// calculate the number of days remaining
const timeDifference = nextBirthday - new Date(currentYear, currentMonth - 1, currentDay);
const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));

const birthdayElement = document.getElementById("birthday");

// define month names
const monthNames = [
    "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
const monthName = monthNames[parseInt(month, 10) - 1];
const currentMonthName = monthNames[parseInt(currentMonth, 10) - 1];

// abbreviate days (st, nd, rd, th)
function dayAbbrev(day, currentDay) {
    if (day === currentDay && (day === 1 || day === 21 || day === 31)) {
        return `${day}st`;
    } else if (day === currentDay && (day === 2 || day === 22)) {
        return `${day}nd`;
    } else if (day === currentDay && (day === 3 || day === 23)) {
        return `${day}rd`;
    } else {
        return `${day}th`;
    }
}

// display birthday
function remainingDaysProper(daysRemaining) {
    if (daysRemaining === 1) {
        birthdayElement.innerHTML = `${age} <span style="font-size:1rem">( ${nextAge} in ${daysRemaining} day)</span>`;
        return `${daysRemaining} day`;
    } else if (daysRemaining === 0) {
        birthdayElement.innerHTML = `<span style="font-size:3rem;">BIRTHDAY!!</span>`;
        return 'today!';
    } else  {
        birthdayElement.innerHTML = `${age} <span style="font-size:1rem">( ${nextAge} in ${daysRemaining} days)</span>`;
        return `${daysRemaining} days`;
    }
}