"use client";

import { useEffect, useState } from "react";
import styles from "./clock.module.scss"

interface ClockProps{
    hourDeg : number;
    minDeg: number;
    secDeg: number;
}

const Clock = ({hourDeg, minDeg, secDeg} : ClockProps) => {

    const [mounted, setMounted] = useState(false);
    const ticks = Array.from({length : 12});

    useEffect(() => {
        setMounted(true);
    },[])

    return(
        <div className={styles.clockBg}>
            <div className={styles.track}></div>
            <div className={styles.hourHand} style={{ transform: `rotate(${mounted ? hourDeg : 0}deg) translateX(-50%) `, opacity: mounted? 1: 0 }}></div>
            <div className={styles.minHand} style={{ transform: `rotate(${mounted? minDeg: 0}deg) translateX(-50%)` , opacity: mounted? 1: 0}}></div>
            <div className={styles.secHand} style={{ transform: `rotate(${mounted? secDeg : 0}deg) translateX(-50%)` , opacity: mounted? 1: 0}}></div>
            {ticks.map((_, index) =>(
                <div key={index} className={`${styles.tick} ${styles.bigTick}`} style={{transform : `rotate(${index*30}deg)`, animationDelay: `${((12-index) * 3) / 12}s`}}></div>
            ))}
        </div>
    )
    
}

export default Clock;