import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  Bar,
} from "recharts";
import { useMediaQuery } from "react-responsive";

const UniswapVolChart = (props) => {
  const { data } = props;
  const isDesktopOrLaptop = useMediaQuery({
    query: `(max-width: 920px)`,
  });

  console.log("this is data", data);

  return (
    <div>
      This is uniswapVol
      <ResponsiveContainer height={!isDesktopOrLaptop ? 400 : 250}>
        <ComposedChart
          data={data}

          // margin={{
          //   top: 20,
          //   right: 20,
          //   bottom: 20,
          //   left: 20,
          // }}
        >
          <CartesianGrid stroke="#f5f5f5" fill={"#f5f5f5"} />

          <XAxis datakey={"t"} />
          {!isDesktopOrLaptop ? (
            <YAxis
              dataKey="v"
              domain={["auto", "auto"]}
              allowDataOverflow={true}
            />
          ) : (
            <div>Nope</div>
          )}
          <Tooltip />
          <Legend />
          {/*<Line type="linear" dataKey="v"  />*/}
          {/*<Line type="natural" dataKey="v" fill="blue" />*/}
          <Bar dataKey="v" fill="blue" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UniswapVolChart;
