import styles from "./PageLogin.module.css";

function PageLogin(props) {
  function logIn() {
    if (props.loggedIn === false) {
      props.setLoggedIn(true);
      console.log("Finally logged in");
    }
  }

  return (
    <>
      <div className={styles.bigBox}>
        <form className={styles.box} onSubmit={logIn}>
          <h1>
            Welcome to <i id="title">Palette</i>!
          </h1>
          <div>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
          </div>
          <button className={styles.buttonBox} type="submit">
            Login
          </button>
        </form>
        
      </div>
    </>
  );
}

export default PageLogin;
