import Image from "next/image";
import styles from "./page.module.css";
import Header from "../components/Header";
import Content from "../components/Content";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <Header />
        <Content />
      </div>
    </main>
  );
}
