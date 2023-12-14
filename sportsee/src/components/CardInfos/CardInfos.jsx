import s from "./style.module.css";
import { DataService } from "../../api/dataService";
import { useEffect, useState } from "react";
import calories from "../../assets/images/calorie.png";
import glucides from "../../assets/images/glucides.png";
import lipides from "../../assets/images/lipides.png";
import proteines from "../../assets/images/proteines.png";
import PropTypes from "prop-types";

export function CardInfos({ user }) {
  // userInfos stockera les données clés de l'utilisateur après leur récupération.
  const [userInfos, setUserInfos] = useState({});

  // useEffect va chercher les informations clés de l'utilisateur dès que le composant est monté ou que l'ID utilisateur change.
  useEffect(() => {
    // Fonction asynchrone pour récupérer les données de l'utilisateur.
    async function getUserInfos() {
      try {
        const userData = await DataService.getUser(user);
        setUserInfos(userData.data.keyData);
      } catch (error) {
        console.log(error);
      }
    }
    // Appel de la fonction pour obtenir les données.
    getUserInfos();
    // Dépendance : l'ID de l'utilisateur.
  }, [user]);

  // Conversion de calorieCount en kilocalories, si la donnée existe.
  const kCal = userInfos.calorieCount ? userInfos.calorieCount / 1000 : 0;

  // Fonction pour formater les données numériques pour l'affichage.
  function parsedData(data) {
    return parseFloat(data).toFixed(3);
  }

  return (
    <>
      <div className={s.container}>
        {/* Bloc d'affichage pour les calories */}
        <div className={s.blocContainer}>
          <img className={s.iconeKcal} src={calories} alt="Calories" />
          <div className={s.containerEnergy}>
            <p className={`${s.energy} ${s.paraf}`}>{parsedData(kCal)}kCal</p>
            <span className={s.subtitle}>Calories</span>
          </div>
        </div>
        {/* Bloc d'affichage pour les protéines */}
        <div className={s.blocContainer}>
          <img className={s.iconeProt} src={proteines} alt="Protéines" />
          <div className={s.containerEnergy}>
            <p className={`${s.energy} ${s.paraf}`}>
              {userInfos.proteinCount}g
            </p>
            <span className={s.subtitle}>Protéines</span>
          </div>
        </div>
        {/* Bloc d'affichage pour les glucides */}
        <div className={s.blocContainer}>
          <img className={s.iconeGlu} src={glucides} alt="Glucides" />
          <div className={s.containerEnergy}>
            <p className={`${s.energy} ${s.paraf}`}>
              {userInfos.carbohydrateCount}g
            </p>
            <span className={s.subtitle}>Glucides</span>
          </div>
        </div>
        {/* Bloc d'affichage pour les lipides */}
        <div className={s.blocContainer}>
          <img className={s.iconeLip} src={lipides} alt="Lipides" />
          <div className={s.containerEnergy}>
            <p className={`${s.energy} ${s.paraf}`}>{userInfos.lipidCount}g</p>
            <span className={s.subtitle}>Lipides</span>
          </div>
        </div>
      </div>
    </>
  );
}

CardInfos.propTypes = {
  user: PropTypes.string.isRequired,
};
