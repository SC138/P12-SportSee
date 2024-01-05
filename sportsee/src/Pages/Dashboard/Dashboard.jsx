import s from "./style.module.css";
import { HorizontalMenu } from "../../components/HorizontalMenu/HorizontalMenu";
import { VerticalMenu } from "../../components/VerticalMenu/VerticalMenu";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataService } from "../../api/dataService";
import { DurationSessions } from "../../components/DurationSessions/DurationSessions";
import { DailyActivity } from "../../components/DailyActivity/DailyActivity";
import { PerformanceUser } from "../../components/PerformanceUser/PerformanceUser";
import { Score } from "../../components/Score/Score";
import { CardInfos } from "../../components/CardInfos/CardInfos";
import logo from "../../assets/images/logo.png";

export function Dashboard() {
  // Récupération de l'ID de l'utilisateur dans l'URL
  const { id } = useParams();

  // Déclaration des états
  const [userName, setUserName] = useState("");
  const [userExists, setUserExists] = useState(true);

  // Utilisation du hook useEffect pour récupérer les données de l'utilisateur
useEffect(() => {
  // Fonction asynchrone pour obtenir les données de l'utilisateur
  async function getUserData() {
    try {
      // Requête API pour obtenir les informations de l'utilisateur
      const userFirstName = await DataService.getUser(id);
      console.log("🚀 ~ file: Dashboard.jsx ~ getUserData ~ userFirstName:", userFirstName);

      // Vérification des données reçues
      if (userFirstName && userFirstName.data && userFirstName.data.userInfos) {
        // Si les données sont valides, mise à jour du prénom de l'utilisateur
        setUserName(userFirstName.data.userInfos.firstName);
      } else {
        // Si les données ne sont pas valides, mise à jour de l'état pour indiquer que l'utilisateur n'existe pas
        setUserExists(false);
      }
    } catch (error) {
      // En cas d'erreur, affichage dans la console et mise à jour de l'état pour indiquer que l'utilisateur n'existe pas
      console.log(
        error,
        "Erreur lors de la récupération des données du firstName"
      );
      setUserExists(false);
    }
  }

    // Appel de la fonction getUserData
    getUserData();
  }, [id]); // Le useEffect se déclenchera à chaque changement de l'ID

  // Si l'utilisateur n'existe pas, affichage d'un message d'erreur
  if (!userExists) {
    return (
      <div className={s.errorContainer}>
        <div className={s.logo}>
          <img src={logo} alt="Logo SportSee" />
        </div>
        <h2>Utilisateur non trouvé</h2>
        <p>L&apos;utilisateur demandé n&apos;existe pas.</p>
        <a href="/">Retour à l&apos;accueil</a>
      </div>
    );
  }

  return (
    <>
      <HorizontalMenu />
      <VerticalMenu />
      <section className={s.main}>
        <h1 className={s.title}>
          Bonjour <span className={s.userName}>{userName}</span>
        </h1>
        <p className={s.text}>
          Félicitation ! Vous avez explosé vos objectifs hier 👏
        </p>
        <div className={s.containerBlock}>
          <div className={s.containerCharts}>
            <DailyActivity user={id} />
            <div className={s.widgets}>
              <DurationSessions user={id} />
              <PerformanceUser user={id} />
              <Score user={id} />
            </div>
          </div>
          <div className={s.cards}>
            <CardInfos user={id} />
          </div>
        </div>
      </section>
    </>
  );
}
