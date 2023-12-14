import s from "./style.module.css";
import { useEffect, useState } from "react";
import { DataService } from "../../api/dataService";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

// Ce composant affiche le score de l'utilisateur sous forme de graphique circulaire.
export function Score({ user }) {
  // State pour stocker le score de l'utilisateur.
  const [userScore, setUserScore] = useState([]);

  // useEffect pour récupérer le score de l'utilisateur après le montage du composant.
  useEffect(() => {
    async function getUserScore() {
      try {
        // Récupération des données de l'utilisateur.
        const userData = await DataService.getUser(user);
        // Extraction du score, avec gestion des différents formats de données.
        const score = userData.data.score
          ? userData.data.score
          : userData.data.todayScore;
        // Mise à jour du state avec le score récupéré.
        setUserScore(score);
      } catch (error) {
        // Gestion des erreurs.
        console.log(error);
      }
    }
    getUserScore();
  }, [user]);

  // Préparation des données pour le graphique.
  const dataScore = [{ value: userScore }];

  // Configuration du graphique circulaire.
  const startAngle = 90;
  const endAngle = startAngle + userScore * 360;

  // Composant personnalisé pour afficher le label du score.
  const customLabel = () => {
    const score = userScore ? userScore : 0;
    return (
      <p className={s.customLabel}>
        <span className={s.customScore}>{`${score * 100}%`}</span> de votre
        objectif
      </p>
    );
  };

  // Rendu du graphique circulaire.
  return (
    <div className={s.containerPieChart}>
      <h3 className={s.subtitle}>Score</h3>
      {customLabel()}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={358} height={358}>
          <Pie
            data={dataScore}
            cx="50%"
            cy="50%"
            outerRadius={65}
            innerRadius={55}
            startAngle={startAngle}
            endAngle={endAngle}
            dataKey="value"
            labelLine={false}
            clipPath="url(#rounded-mask)"
            cornerRadius={50}
          >
            <Cell fill="#E60000" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

Score.propTypes = {
  user: PropTypes.string.isRequired,
};
