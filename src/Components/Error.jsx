import styles from "../SCSS/Error.module.scss";

export default function Error({ errorMessage }) {
  const cod = errorMessage?.cod;
  const message = errorMessage?.message;
  const response = errorMessage?.response;
  return (
    <div className={styles.error}>
      {cod === "404" && (
        <h1 style={{ fontSize: "5rem" }}>{`${response} ${cod}`}</h1>
      )}
      {cod === "404" && <h1 style={{ fontSize: "5rem" }}>{message}</h1>}

      {!errorMessage && (
        <>
          <h3>Connect to the internet</h3>
          <h2>You're offline. Check your connection.</h2>
        </>
      )}
    </div>
  );
}
