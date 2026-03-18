"use client"

import { useEffect, useState } from "react";
import styles from "./timeUnit.module.scss";

interface props {
    value : string;
    label: string;
}

const TimeUnit = ({ value, label} : props) => {

    // const [mounted, setMounted] = useState(false);

    // useEffect(() => {
    //     setMounted(true);
    // }, [])

    return(
    <div className={styles.timeUnit}>
        <div key={value} className={styles.flipAnim} suppressHydrationWarning>{value}</div>
        <label>{label}</label>
    </div>
    )
}

export default TimeUnit;