import styles from "./productList.module.scss";
import WeeklyDeal from "./_components/WeeklyDeal";
import CategoryArea from "./_components/CategoryArea";
import fog from "../../../../public/images/fog6.png";
import Image from "next/image";

export default function ProductList() {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.title}>Weekly Deal</div>
        <WeeklyDeal />
      </div>
      <div className={styles.sectionTwo}>
        <div className={styles.titleTwo}>Category</div>
        <div className={styles.categoryArea}>
          <CategoryArea></CategoryArea>
        </div>
      </div>
      {/* <div className={styles.fogContainer}>
        <Image src={fog} alt="fog1.png" fill sizes=""></Image>
        <Image src={fog} alt="fog1.png" fill sizes=""></Image>
        <Image src={fog} alt="fog1.png" fill sizes=""></Image>
      </div> */}
    </div>
  );
}
