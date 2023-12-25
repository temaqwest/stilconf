import React, {useEffect, useState} from 'react';
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './DateTimeCard.module.scss'

interface DateTimeCardProps {
    className?: string
}

const DateTimeCard = ({className}: DateTimeCardProps) => {

    const [clockDate, setClockDate] = useState('')
    const [clockTime, setClockTime] = useState('')

    let lastShowTime: Date
    let intervalId: ReturnType<typeof setInterval>
    function watchClock() {
        const updateTime = () => {
            const time = new Date()
            if (
                !lastShowTime ||
                lastShowTime.getHours() !== time.getHours() ||
                lastShowTime.getMinutes() !== time.getMinutes()
            ) {
                lastShowTime = time
                setClockDate(time.toDateString())
                setClockTime(time.toTimeString().slice(0, 5))
            }
        }
        updateTime()

        intervalId = setInterval(() => {
            updateTime()
        }, 1000)
    }

    useEffect(() => {
        watchClock()

        return () => {
            clearInterval(intervalId)
        };
    }, []);

    return (
        <div className={classNames(cls?.DateTimeCard, {}, [className])}>
            <span className={cls.Time}>{clockTime}</span>
            <span className={cls.Date}>{clockDate}</span>
        </div>
    );
};

export default DateTimeCard;
