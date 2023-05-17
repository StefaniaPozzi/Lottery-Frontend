import Image from "next/image";
import styles from "./page.module.css";
import Main from "../components/Main.jsx";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <Main />
      </div>
    </main>
  );
}
