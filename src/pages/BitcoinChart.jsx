import { createChart } from 'lightweight-charts'
import { useEffect, useState, useRef } from 'react'
import { getMarketPrice } from '../services/bitcoinService'

export const ChartComponent = (props) => {
  const chartContainerRef = useRef()

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      })
    }

    const { data } = props

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
    })
    chart.timeScale().fitContent()

    const newSeries = chart.addAreaSeries()
    newSeries.setData(data)

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  })

  return <div ref={chartContainerRef} className="chart-container" />
}
export const BitcoinChart = () => {
  const [chartData, setChartData] = useState(null)
  const [currentPrice, setCurrentPrice] = useState(null)
  const [yesterdayPrice, setYesterdayPrice] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    getData()
    if (data) {
      const mappedData = data.map((t) => ({
        time: new Date(t.x * 1000).toLocaleDateString('en-CA'),
        value: t.y,
      }))
      setChartData(mappedData)
      setCurrentPrice(mappedData[mappedData.length - 1].value)
      setYesterdayPrice(mappedData[mappedData.length - 2].value)
    }
  }, [data])

  const getData = async () => {
    const data = await getMarketPrice()
    setData(data)
  }

  const percentageDifference =
    ((currentPrice - yesterdayPrice) / yesterdayPrice) * 100

  if (chartData) {
    return (
      <div className="data-container">
        <h1 className="header">BTC Market Data</h1>
        <div className="price-details">
        <div className="price-item">
          <span>Current Price:</span> ${currentPrice}
        </div>
        <div className="price-item">
          <span>Yesterday's Price:</span> ${yesterdayPrice}
        </div>
        <div className="price-item">
          <span>Difference:</span> {percentageDifference.toFixed(2)}%
        </div>
      </div>
        <ChartComponent data={chartData}></ChartComponent>
      </div>
    )
  } else {
    return <div className="data-container">Loading...</div>
  }
}
