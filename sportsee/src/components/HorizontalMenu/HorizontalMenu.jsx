import s from "./style.module.css";
import logo from "../../assets/images/logo.png";

export function HorizontalMenu() {
  return (
    <>
      <div className={s.container}>
        <div className={s.logo}>
          <img src={logo} alt="Logo SportSee" />
        </div>

        <nav className={s.nav}>
          <ul className={s.menu}>
            <li className={s.element}>Accueil</li>
            <li className={s.element}>Profil</li>
            <li className={s.element}>Réglage</li>
            <li className={s.element}>Communauté</li>
          </ul>
        </nav>
      </div>
    </>
  );
}
