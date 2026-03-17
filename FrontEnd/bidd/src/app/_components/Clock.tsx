import styles from "./clock.module.scss"

interface ClockProps{
    hourDeg : number;
    minDeg: number;
    secDeg: number;
}

const Clock = ({hourDeg, minDeg, secDeg} : ClockProps) => {

    const ticks = Array.from({length : 12});

    return(
        <div className={styles.clockBg}>
            <div className={styles.track}></div>
            <div className={styles.hourHand} style={{ transform: `rotate(${hourDeg}deg) translateX(-50%)` }}></div>
            <div className={styles.minHand} style={{ transform: `rotate(${minDeg}deg) translateX(-50%)` }}></div>
            <div className={styles.secHand} style={{ transform: `rotate(${secDeg}deg) translateX(-50%)` }}></div>
            {ticks.map((_, index) =>(
                <div key={index} className={`${styles.tick} ${styles.bigTick}`} style={{transform : `rotate(${index*30}deg)`, animationDelay: `${((12-index) * 3) / 12}s`}}></div>
            ))}
        </div>
    )
    
}

export default Clock;