import styles from "./cardSection.module.scss"
import Image from 'next/image';
import register from "@/../public/image/register.png";
import schedule from "@/../public/image/schedule.png";


const CardSection = () => {
    return(
    <div className={styles.cardArea}>
        <h1>쉽고 빠르게 쇼핑몰 대여를 시작하세요</h1>
        <div className={styles.cardGrid}>
            <div className={styles.subCard}>
                <div className={styles.iconWrapper}>
                    <Image src={register} alt="기업등록" fill objectPosition="center"></Image>
                </div>
                <h3>01. 기업 등록</h3>
                <p>기업 정보를 등록합니다.</p>
            </div>
            <div className={styles.subCard}>
                <div className={styles.iconWrapper}>
                    <Image src={register} alt="상품등록" fill objectPosition="center"></Image>
                </div>
                <h3>02. 상품 등록</h3>
                <p>판매할 상품을 등록합니다.</p>
            </div>
            <div className={styles.subCard}>
                <div className={styles.iconWrapper}>
                    <Image src={schedule} alt="시간선택" fill objectPosition="center"></Image>
                </div>
                <h3>03. 대여 시간 선택</h3>
                <p>원하는 대여 시간을 선택합니다.</p>
            </div>
        </div>
    </div>
    )
}

export default CardSection;