import s from "./style.module.css";
import meditation from "../../assets/images/meditation.png";
import swimming from "../../assets/images/swimming.png";
import bike from "../../assets/images/bike.png";
import gym from "../../assets/images/gym.png";

export function VerticalMenu() {
  return (
    <>
      <div className={s.container}>
        <div className={s.icons}>
          <img className={s.icon} src={meditation} alt="icon meditation" />
          <img className={s.icon} src={swimming} alt="icon swimming" />
          <img className={s.icon} src={bike} alt="icon bike" />
          <img className={s.icon} src={gym} alt="icon gym" />
        </div>
        <p className={s.copyright}>Copyright, SportSee 2020</p>
      </div>
    </>
  );
}
