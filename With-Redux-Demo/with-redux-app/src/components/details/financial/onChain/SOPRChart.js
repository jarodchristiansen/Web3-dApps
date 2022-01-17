import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMediaQuery } from "react-responsive";

const SOPRChart = (props) => {
  const { data } = props;

  const isDesktopOrLaptop = useMediaQuery({
    query: `(max-width: 920px)`,
  });

  return (
    <div>
      SOPRCHART
      <div>
        <ResponsiveContainer
          height={!isDesktopOrLaptop ? 400 : 250}
          width={isDesktopOrLaptop ? 250 : 850}
        >
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
              <YAxis domain={[0, 2]} allowDataOverflow={true} />
            ) : (
              <div>Nope</div>
            )}
            <Tooltip />
            <Legend />
            {/*<Line type="linear" dataKey="v"  />*/}
            <Line
              type="linear"
              dataKey="v"
              fill="red"
              stroke={"red"}
              dot={false}
            />
            {/*<Line type="linear" dataKey="e" fill="blue" stroke={"blue"}/>*/}
            {/*<Line type="linear" dataKey="f" fill="green" stroke={"green"}/>*/}

            {/*<Bar dataKey="ratio" fill="blue"/>*/}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SOPRChart;
