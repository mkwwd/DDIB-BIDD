import styles from "./clock.module.scss"

interface ClockProps{
    hourDeg : number;
    minDeg: number;
    secDeg: number;
}

const Clock = ({hourDeg, minDeg, secDeg} : ClockProps) => {

    return(
        <div className={styles.clockBg}>
            <div className={styles.track}></div>
            <div className={styles.hourHand} style={{ transform: `rotate(${hourDeg}deg) translateX(-50%)` }}></div>
            <div className={styles.minHand} style={{ transform: `rotate(${minDeg}deg) translateX(-50%)` }}></div>
            <div className={styles.secHand} style={{ transform: `rotate(${secDeg}deg) translateX(-50%)` }}></div>
        </div>
    )
    
}

export default Clock;