import {useCallback, useEffect, useState} from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { loadStats } from "../helpers/proyects_api";


export default function App({newData,id, token}) {
  console.log(id, token);
  const [totalData, setTotaData] = useState([])
  useEffect(() => {
    loadStats(id, token).then((res) => {
      let d2 = []
      if (res) {
        let eventTotalCounter = 0
        res.forEach(element => {
          element["eventos"].forEach(e => {
            eventTotalCounter++
            const index = d2.findIndex(x => x.name === e.id)
            if (index === -1) {
              d2.push({ name: e.id, event: 1, avg: 1 })
            }
            if (index !== -1) {
              d2[index].event++
              d2[index].avg++
            }
          })
        });
        d2.forEach(element => {
          element.avg = Math.round((element.avg/eventTotalCounter)*100)
        });
        console.log(d2);
        setTotaData(d2)
      }
    });
  }, [])

  useEffect(() => {
    let d2 = []
    let counter = 0
    newData.forEach(element => {
      counter ++
      const index = totalData.findIndex(x => x.name === element.name)
      if (index === -1) {
        d2.push({ name: element.name, event: 1, avg: 1 })
      } else {
        d2.push({ name: element.name, event: totalData[index].event + element.event, avg: 1 })
      }
    })
    d2.forEach(element => {
      element.avg = Math.round((element.event/counter)*100)
    });
    setTotaData(d2)    

  }, [newData])


  return (
    <ComposedChart
      width={450}
      height={250}
      data={totalData}
      margin={{
        top: 35,
        right: 40,
        bottom: 0,
        left: 10
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" scale="band" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="event" barSize={20} fill="#413ea0"/>
      <Line type="monotone" dataKey="avg" stroke="#ff7300"/>
    </ComposedChart>
  );
}