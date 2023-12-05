// import s from "./style.module.css";
import { HorizontalMenu } from "../../components/HorizontalMenu/HorizontalMenu";
import { VerticalMenu } from "../../components/VerticalMenu/VerticalMenu";
import { useState, useEffect } from "react";
import { Data } from "../../api/data";
import PropTypes from "prop-types";

export function Dashboard({ user }) {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    async function getUserData() {
      try {
        const userFirtName = await Data.getUser(user);
        setUserName(userFirtName.data.userInfos.firstName);
      } catch (error) {
        console.log(
          error,
          "Erreur lors de la récupération des données du firstName"
        );
      }
    }
    getUserData();
  }, [user]);
  return (
    <>
      <HorizontalMenu />
      <h1>Bonjour {userName}</h1>
      <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      <VerticalMenu />
    </>
  );
}

Dashboard.propTypes ={
    user: PropTypes.string.isRequired,
}