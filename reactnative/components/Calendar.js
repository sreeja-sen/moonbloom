import React, { useState, useContext, useMemo, useEffect } from 'react';
import '../styles/Calendar.css';
import { userContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import FirebaseApp from '../firebase.js';
import { ref, set, get, update } from "firebase/database"

const Calendar = ({ periods, cycleLength, periodLength, addPeriod, removePeriod, setPeriods, database }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const { uid } = useContext(userContext);

    useEffect(() => {
        if (database && uid) {
            const updates = {
                "calendar": periods
            }
            console.log("Updating")
            update(ref(database, uid), updates)
        }
    }, [periods]);

    useEffect(() => {
        if (database && uid) {
            console.log("Downloading")
            get(ref(database, uid + "/calendar")).then(snapshot => {
                const result = snapshot.val();
                if (result) {
                    setPeriods(result);
                }
            })
        }
    }, [database, uid]);


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

    const getDayHeaders = () => {
        return (
            <>
                <div className="day-header">Sun</div>
                <div className="day-header">Mon</div>
                <div className="day-header">Tue</div>
                <div className="day-header">Wed</div>
                <div className="day-header">Thu</div>
                <div className="day-header">Fri</div>
                <div className="day-header">Sat</div>
            </>
        );          
    };

    const updateCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const predictedPeriods = getPredictedPeriodDays();
        const ovulationDays = getOvulationDays(predictedPeriods);

        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`}></div>);
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
            days.push(
                <div
                    key={date}
                    className={dayClass}
                    data-date={date}
                    onClick={() => togglePeriod(date)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    const togglePeriod = (date) => {
        if (periods.includes(date)) {
            removePeriod(date);
        } else {
            addPeriod(date);
        }
    };

    return (
        <div className="calendar-container">
            <div className="month-controls">
                
                <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                
                <h2 id="monthDisplay">{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
                
                <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>

            </div>
            <div id="calendar">
                {getDayHeaders()}
                {updateCalendar()}
            </div>
        </div>
    );
};

export default Calendar;
