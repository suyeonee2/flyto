import cn from "classnames";
import styles from "./ContentLayout.module.css";

export default function ContentLayout({ children, className }) {
  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
