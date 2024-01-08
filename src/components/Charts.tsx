"use client";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
type Props = {
  data: {
    [key: string]: string | number;
  }[];
};

const Charts = ({ data }: Props) => {
  const xLabelKey = Object.keys(data[0]).find((key) => key !== "date");
  return (
    <div className="pt-16">
      <ResponsiveContainer width={"100%"} height={250}>
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid horizontal={false} stroke="#f5f5f5" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{ fill: "#aaa" }}
          />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={xLabelKey}
            stroke="#ffb347"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
