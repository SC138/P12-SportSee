import s from "./style.module.css";
import { useEffect, useState } from "react";
import { DataService } from "../../api/dataService";
import { USER_PERFORMANCE } from "../../api/config";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

export function PerformanceUser({ user }) {
  // State pour stocker les données de performance.
  const [performance, setPerformance] = useState(null);

  // useEffect pour charger les données de performance après le montage du composant.
  useEffect(() => {
    // Fonction asynchrone pour obtenir les données de performance.
    async function getPerformance() {
      try {
        // Récupère les données de performance à l'aide de DataService en passant l'identifiant de l'utilisateur.
        const userPerformance = await DataService.getUserData(
          user,
          USER_PERFORMANCE
        );
        // Stocke les données de performance dans le state.
        setPerformance(userPerformance.data);
      } catch (error) {
        // Affiche une erreur dans la console si la requête échoue.
        console.error(
          "Erreur lors de la récupération des performances de l'utilisateur:",
          error
        );
      }
    }
    // Appelle getPerformance si l'identifiant utilisateur est défini.
    if (user) {
      getPerformance();
    }
    // Le tableau de dépendances contient user pour réexécuter l'effet si l'identifiant change.
  }, [user]);

  // Dictionnaire pour traduire les identifiants de types de performance en texte.
  const kindValue = {
    1: "Cardio",
    2: "Energie",
    3: "Endurance",
    4: "Force",
    5: "Vitesse",
    6: "Intensité",
  };

  // Vérifie si les données de performance sont chargées et si c'est un tableau.
  // Si 'performance' est null ou si 'performance.data' n'est pas un tableau, cela signifie
  // que les données ne sont pas encore prêtes ou disponibles, donc j'affiche un message de chargement.
  if (!performance || !Array.isArray(performance.data)) {
    return <div>Chargement...</div>;
  }

  // Transforme les données de performance pour les adapter au format attendu par le RadarChart.
  const dataForRadarChart = performance.data.map((dataPoint) => ({
    // Nouvel objet avec les mêmes propriétés que l'objet original ('...dataPoint') ainsi qu'une propriété supplémentaire 'kind'.
    ...dataPoint,
    // Utilise kindValue pour obtenir la traduction du type de performance.
    kind: kindValue[dataPoint.kind],
  }));

  // Rendu du graphique radar avec les données de performance transformées.
  return (
    <div className={s.radarChart}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          cx="49%"
          cy="50%"
          outerRadius="68%"
          data={dataForRadarChart}
        >
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="kind"
            tick={{ fontSize: "12px", dy: 4 }}
            stroke="#fff"
            axisLine={false}
            tickLine={false}
          />
          <PolarRadiusAxis domain={[0, 100]} axisLine={false} tick={false} />
          <Radar
            name=""
            dataKey="value"
            stroke="#FF0000"
            fill="#FF0000"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
PerformanceUser.propTypes = {
  user: PropTypes.string.isRequired,
};
