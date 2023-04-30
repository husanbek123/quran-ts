import styles from "./index.module.scss";
import spinner from "../../assets/Spinner.svg";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className={styles.loading}>
      <img src={spinner} alt="" />
    </div>
  );
}
