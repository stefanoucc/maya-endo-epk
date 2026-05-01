import MacVintageGame from "@/components/MacVintageGame";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.homeShell}>
      <MacVintageGame />
    </div>
  );
}
