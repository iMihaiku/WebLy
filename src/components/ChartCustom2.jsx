import React, { useCallback, useEffect, useState } from 'react'
import { PieChart, Pie, Sector, Cell } from 'recharts'
import { loadStats } from '../helpers/proyects_api'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ABDEE6', 'FFAEA5', '#00C49F', '#FFBB28', '#FF8042', '#ABDEE6', 'FFAEA5']

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 15) * cos
  const my = cy + (outerRadius + 15) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 5
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  const payloadedName = payload.name.split('/')
  let name = ""
  for (let index = 2; index < payloadedName.length; index++) {
    payloadedName[index] === "" 
    ? name += ""
    : name +=  payloadedName[index]+"/"
  }
  return (
    <g>
      <text x={cx} y={25} dy={8} textAnchor="middle" fill={"white"}>
        {name}
      </text>
      <text x={cx} y={50} dy={8} textAnchor="middle" fill={"white"}>
      {`Views ${value}`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={0.7} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#ffffff"
      >{`Views ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#bbb"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

export default function ChartCustom2({ newData, id, token, lastStat}) {
  console.log("Pastel actualizado");
  const [totalData, setTotaData] = useState([])
  useEffect(() => {
    loadStats(id, token).then((d1) => {
      let d2 = []
      if (d1) {
        d1.forEach(element => {
          element["visitas"].forEach(e => {
            const index = d2.findIndex(x => x.name === e.url)
            if (index === -1) {
              d2.push({ name: e.url, value: 1 })
            } else {
              d2[index].value ++
            }
          })
        });
        setTotaData(d2)
      }
    })
  }, [id])

  
  
  useEffect(() => {
    if (!newData.length<1) {
      let d2 = []
      totalData.forEach(element => {
        const index = newData.findIndex(x => x.name === element.name)
        if (index === -1) {
          d2.push(element)
        } else {
          d2.push({ name: element.name, value: element.value + newData[index].value })
        }
    }) 
    setTotaData(d2)
    }
  }, [newData])




  const [activeIndex, setActiveIndex] = useState(0)
  const onPieEnter = useCallback(
    (_, index, totalData) => {
      setActiveIndex(index)
    },
    [setActiveIndex]
  )


  return (
    <PieChart width={380} height={330}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={totalData}
        cx={190}
        cy={180}
        innerRadius={50}
        outerRadius={85}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      >
        {totalData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  )
}
