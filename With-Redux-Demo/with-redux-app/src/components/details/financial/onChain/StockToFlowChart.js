import {Bar, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Line} from "recharts";
import {useMediaQuery} from "react-responsive";


const StockToFlowChart = (data) => {

    {console.log("data in stocktoflowchart -------", data.data)}

    const isDesktopOrLaptop = useMediaQuery({
        query: `(max-width: 920px)`
    })



    return (
        <div>
            <ResponsiveContainer
                height={!isDesktopOrLaptop ? 400 : 250} width={900}
            >

                <ComposedChart
                    data={data.data}

                    // margin={{
                    //   top: 20,
                    //   right: 20,
                    //   bottom: 20,
                    //   left: 20,
                    // }}
                >
                    <CartesianGrid stroke="#f5f5f5" fill={"#f5f5f5"}/>


                    <XAxis datakey={"time"}/>
                    {!isDesktopOrLaptop ? (

                        <YAxis
                               // domain={[0,  1750000]}
                                ticks={[0.001, 0.01, 0.1, 1, 10, 100, 1000, 10000, 100000, 1000000]}
                               allowDataOverflow={true}/>
                    ) : (
                        <div>Nope</div>
                    )}
                    <Tooltip />
                    <Legend />
                    {/*<Line type="linear" dataKey="v"  />*/}
                    <Line type="linear" dataKey="ratio" fill="red" stroke={"red"} />
                    <Line type="linear" dataKey="e" fill="blue" stroke={"blue"}/>
                    <Line type="linear" dataKey="f" fill="green" stroke={"green"}/>

                    {/*<Bar dataKey="ratio" fill="blue"/>*/}


                </ComposedChart>

            </ResponsiveContainer>

        </div>
    )
}


export default StockToFlowChart