document.addEventListener('DOMContentLoaded', () => {
    const settingsBtn = document.getElementById('settingsBtn');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const keyToggle = document.getElementById('keyToggle');
    const settingsPanel = document.getElementById('settingsPanel');
    const calendar = document.getElementById('calendar');
    const monthDisplay = document.getElementById('monthDisplay');
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');
    const keyPanel = document.getElementById('keyPanel');

    let periods = [];
    let cycleLength = 28;
    let periodLength = 5;
    let currentDate = new Date();

    const getPredictedPeriodDays = () => {
        const predictedPeriods = [];
        if (periods.length === 0) return predictedPeriods;

        let firstPeriodDate = new Date(periods[0]);

        for (let i = 0; i < 12; i++) {
            let periodStartDate = new Date(firstPeriodDate);
            periodStartDate.setDate(periodStartDate.getDate() + i * cycleLength);
            for (let j = 0; j < periodLength; j++) {
                let periodDate = new Date(periodStartDate);
                periodDate.setDate(periodDate.getDate() + j);
                predictedPeriods.push(periodDate.toISOString().split('T')[0]);
            }
        }
        return predictedPeriods;
    };

    const getOvulationDays = (predictedPeriods) => {
        const ovulationDays = [];
        const ovulationOffset = Math.floor(cycleLength / 2);
        predictedPeriods.forEach(periodDate => {
            let ovulationDate = new Date(periodDate);
            ovulationDate.setDate(ovulationDate.getDate() - ovulationOffset);
            ovulationDays.push(ovulationDate.toISOString().split('T')[0]);
        });
        return ovulationDays;
    };

    const getDayHeaders = () =>

 {
        return '<div class="day-header">Sun</div>' +
               '<div class="day-header">Mon</div>' +
               '<div class="day-header">Tue</div>' +
               '<div class="day-header">Wed</div>' +
               '<div class="day-header">Thu</div>' +
               '<div class="day-header">Fri</div>' +
               '<div class="day-header">Sat</div>';
    };

    const updateCalendar = () => {
        calendar.innerHTML = getDayHeaders();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const predictedPeriods = getPredictedPeriodDays();
        const ovulationDays = getOvulationDays(predictedPeriods);

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendar.innerHTML += '<div></div>';
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day).toISOString().split('T')[0];
            let dayClass = 'normal';
            if (periods.includes(date)) {
                dayClass = 'period';
            } else if (predictedPeriods.includes(date)) {
                dayClass = 'period';
            } else if (ovulationDays.includes(date)) {
                dayClass = 'ovulation';
            }
            calendar.innerHTML += `<div class="${dayClass}" data-date="${date}">${day}</div>`;
        }

        monthDisplay.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
    };

    const togglePeriod = (event) => {
        const date = event.target.dataset.date;
        if (!date) return;

        if (periods.includes(date)) {
            periods = periods.filter(d => d !== date);
        } else {
            periods.push(date);
            periods.sort();
        }
        updateCalendar();
    };

    const saveSettings = () => {
        cycleLength = parseInt(document.getElementById('cycleLength').value);
        periodLength = parseInt(document.getElementById('periodLength').value);
        updateCalendar();
    };

    settingsBtn.addEventListener('click', () => {
        settingsPanel.style.display = settingsPanel.style.display === 'block' ? 'none' : 'block';
    });

    saveSettingsBtn.addEventListener('click', saveSettings);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });

    keyToggle.addEventListener('click', () => {
        keyPanel.style.display = keyPanel.style.display === 'block' ? 'none' : 'block';
        keyPanel.style.top = keyToggle.getBoundingClientRect().bottom + 'px';
        keyPanel.style.left = keyToggle.getBoundingClientRect().left + 'px';
    });

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });

    calendar.addEventListener('click', togglePeriod);

    updateCalendar();
});
