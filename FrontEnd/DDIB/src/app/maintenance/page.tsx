import styles from "./page.module.scss";

export default function MaintenancePage() {
  return (
    <div className={styles.maintenanceArea}>
      <h1>서비스 점검 중입니다</h1>
      <h3>잠시 후 다시 이용해 주세요.</h3>
    </div>
  );
}
