// Initialize variables
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let periodData = []; 

const calendar = document.getElementById('calendar');
const currentMonthSpan = document.getElementById('currentMonth');

const periodLengthInput = document.getElementById('periodLength');
const cycleLengthInput = document.getElementById('cycleLength');

document.getElementById('prevMonth').addEventListener('click', () => changeMonth(-1));
document.getElementById('nextMonth').addEventListener('click', () => changeMonth(1));
document.getElementById('prevYear').addEventListener('click', () => changeYear(-1));
document.getElementById('nextYear').addEventListener('click', () => changeYear(1));

function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
    }
    renderCalendar();
}

function changeYear(direction) {
    currentYear += direction;
    renderCalendar();
}

function renderCalendar() {
    calendar.innerHTML = ''; 
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    currentMonthSpan.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        calendar.innerHTML += '<div></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const dateStr = date.toISOString().split('T')[0];
        const dayElement = document.createElement('div');

        dayElement.textContent = day;
        dayElement.addEventListener('click', () => togglePeriod(dateStr));

        if (periodData.includes(dateStr)) {
            dayElement.classList.add('active');
        }

        if (isPredictedPeriod(date)) {
            dayElement.classList.add('predicted');
        }

        calendar.appendChild(dayElement);
    }
}

function togglePeriod(dateStr) {
    const index = periodData.indexOf(dateStr);
    if (index > -1) {
        periodData.splice(index, 1);
    } else {
        periodData.push(dateStr);
    }
    renderCalendar();
}

function isPredictedPeriod(date) {
    if (periodData.length === 0) return false;
    
    const lastPeriodDate = new Date(periodData[periodData.length - 1]);
    const periodLength = parseInt(periodLengthInput.value);
    const cycleLength = parseInt(cycleLengthInput.value);

    let nextPeriodStart = new Date(lastPeriodDate);
    nextPeriodStart.setDate(nextPeriodStart.getDate() + cycleLength);

    let nextPeriodEnd = new Date(nextPeriodStart);
    nextPeriodEnd.setDate(nextPeriodEnd.getDate() + periodLength - 1);

    return date >= nextPeriodStart && date <= nextPeriodEnd;
}

renderCalendar();
