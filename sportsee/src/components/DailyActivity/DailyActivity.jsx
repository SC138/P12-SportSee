import s from "./style.module.css";
import { useEffect, useState } from "react";
import { DataService } from "../../api/dataService";
import { USER_ACTIVITY } from "../../api/config";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

export function DailyActivity({ user }) {
  const [dailyActivity, setDailyActivity] = useState("");

  //data.sessions.day kilogram calories
  useEffect(() => {
    async function getDailyActivity() {
      try {
        const userActivity = await DataService.getUserData(user, USER_ACTIVITY);
        setDailyActivity(userActivity.data.sessions);
      } catch (error) {
        console.log(
          error,
          "Erreur lors de la récupération des données des sessions"
        );
      }
    }
    getDailyActivity();
  }, [user]);

  if (dailyActivity) {
    dailyActivity.map((item, index) => {
      item.day = index + 1;
    });
  }

  const legend = ["Poids (kg)", "Calories brûlées (kCal)"];

  const customLegend = () => {
    return (
      <>
        <div className={s.containerKg}>
          <span className={s.circleKg}></span>
          <p className={s.legendKg}>{legend[0]}</p>
        </div>
        <div className={s.containerKcal}>
          <span className={s.circleKcal}></span>
          <p className={s.legendKcal}>{legend[1]}</p>
        </div>
      </>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={s.tooltip}>
          <p className={s.label}>{`${payload[0].value} kg`}</p>
          <p className={s.label}>{`${payload[1].value} kCal`}</p>
        </div>
      );
    }
    return null;
  }

  return (
    <>
      <div className={s.container}>
        <h3 className={s.title}>Activité quotidienne</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailyActivity} barGap={10}>
            <CartesianGrid strokeDasharray="2" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#9b9eac"
              tickLine={false}
              axisLine={false}
              tickMargin={15}
            />
            <YAxis
              stroke="#9b9eac"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={15}
              style={{ fontSize: "12px" }}
            />
            <Tooltip content={CustomTooltip} />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{
                position: "absolute",
                top: "-40px",
                right: "30px",
              }}
              content={customLegend}
            />
            <Bar
              dataKey="kilogram"
              fill="#282D30"
              barSize={10}
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="calories"
              fill="#E60000"
              barSize={10}
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

DailyActivity.propTypes = {
  user: PropTypes.string.isRequired,
  active: PropTypes.bool,
  payload: PropTypes.array,
};
