import styles from "./timeUnit.module.scss";

interface props {
    value : string;
    label: string;
}

const TimeUnit = ({ value, label} : props) => {
    return(
    <div className={styles.timeUnit}>
        <div key={value} className={styles.flipAnim}>{value}</div>
        <label>{label}</label>
    </div>
    )
}

export default TimeUnit;