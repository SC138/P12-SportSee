import s from "./style.module.css";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { DataService } from "../../api/dataService";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { USER_AVERAGE } from "../../api/config";

export function DurationSessions({ user }) {
  const data = ["L", "M", "M", "J", "V", "S", "D"];

  const [sessions, setSessions] = useState("");

  useEffect(() => {
    async function getDurationSessions() {
      try {
        const durationSessions = await DataService.getUserData(
          user,
          USER_AVERAGE
        );
        setSessions(durationSessions.data.sessions);
      } catch (error) {
        console.log(
          error,
          "Erreur lors de la récupération des données des sessions"
        );
      }
    }
    getDurationSessions();
  }, [user]);

  if (sessions) {
    sessions.map((session, index) => {
      session.day = data[index];
    });
  }

  const CustomXAxis = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          className={s.customXAxis}
          x={5}
          y={0}
          dy={20}
          textAnchor="end"
          fill="#FFFFFF"
          style={{ letterSpacing: "2px" }}
        >
          {payload.value}
        </text>
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={s.customTooltip}>
          <p className={s.label}>{`${payload[0].value} min`}</p>
        </div>
      );
    }
    return null;
  };

  const [hoveredData, setHoveredData] = useState(null);

  const handleMouseOver = (event) => {
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    const containerHeight = event.currentTarget.clientHeight;

    setHoveredData({ x, y, overlayHeight: containerHeight - y });
  };

  return (
    <>
      <div
        className={s.containerChart}
        onMouseMove={handleMouseOver}
        onMouseLeave={() => setHoveredData(null)}
      >
        <div
          className={s.overlay}
          style={{
            background: hoveredData ? "rgba(0,0,0,0.5)" : "transparent",
            width: hoveredData ? `calc(100% - ${hoveredData.x}px)` : "100%",
            left: hoveredData ? `${hoveredData.x}px` : 0,
          }}
        />
        <h3 className={s.title}>Durée moyenne des sessions</h3>
        <ResponsiveContainer width="100%" height="50%">
          <LineChart data={sessions} style={{ marginTop: "40px" }}>
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "white", stopOpacity: 0.2 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "white", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <XAxis
              className={s.axis}
              dataKey="day"
              stroke="#FFFFFF"
              axisLine={false}
              tickLine={false}
              padding={{ left: 10, right: 10 }}
              tick={<CustomXAxis />}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line
              type="natural"
              dataKey="sessionLength"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={false}
              isAnimationActive={false}
            />
            <ReferenceDot />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

DurationSessions.propTypes = {
  user: PropTypes.string.isRequired,
  payload: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  active: PropTypes.bool,
};
