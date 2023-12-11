// import s from "./style.module.css";
import { HorizontalMenu } from "../../components/HorizontalMenu/HorizontalMenu";
import { VerticalMenu } from "../../components/VerticalMenu/VerticalMenu";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataService } from "../../api/dataService";
import { DurationSessions } from "../../components/DurationSessions/DurationSessions";


export function Dashboard() {
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    async function getUserData() {
      try {
        const userFirtName = await DataService.getUser(id);
        setUserName(userFirtName.data.userInfos.firstName);
      } catch (error) {
        console.log(
          error,
          "Erreur lors de la récupération des données du firstName"
        );
      }
    }
    getUserData();
  }, [id]);
  return (
    <>
      <HorizontalMenu />
      <h1>Bonjour {userName}</h1>
      <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      <DurationSessions user={id} />
      <VerticalMenu />
    </>
  );
}

// Dashboard.propTypes = {
//   user: PropTypes.string.isRequired,
// };
