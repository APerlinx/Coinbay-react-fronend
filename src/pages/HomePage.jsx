import { userService } from '../services/userService'
import { getRate } from '../services/bitcoinService'
import { utilService } from '../services/utilService'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DonutLoader } from '../cmps/DonutLoader'

export function HomePage() {
  const [user, setUser] = useState(null)
  const [bitcoinValue, setBitcoinValue] = useState(null)
  const [isLoading, setIsLoading] = useState(true) 
  const navigate = useNavigate() 

  useEffect(() => {
    ;(async () => {
      try {
        const loadedUser = await userService.getUser()
        if (loadedUser) {
          setUser(loadedUser)
        } else {
          navigate('/signup')
        }
      } catch {
        navigate('/signup')
      } finally {
        setIsLoading(false)
      }
    })()
  }, [navigate])

  useEffect(() => {
    const updateBitcoinValue = async () => {
      if (!user || user.coins === undefined || document.hidden) return

      try {
        const rate = await getRate(user.coins)
        setBitcoinValue(rate)
      } catch (error) {
        console.error('Error updating Bitcoin value:', error)
      }
    }

    updateBitcoinValue()
    const intervalId = setInterval(updateBitcoinValue, 3600000) // Update every hour

    // Event listener to update when the page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) updateBitcoinValue()
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(intervalId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [user])

  const bitcoinIcon = utilService.getImgUrl('../assets/imgs/bitcoin.svg')
  const usdIcon = utilService.getImgUrl('../assets/imgs/usd.svg')
  const ethIcon =  utilService.getImgUrl('../assets/imgs/eth.svg')
  const cardanoIcon =  utilService.getImgUrl('../assets/imgs/cardano.svg')
  const xrpIcon =  utilService.getImgUrl('../assets/imgs/xrp.svg')
  const polygonIcon =  utilService.getImgUrl('../assets/imgs/polygon.svg')

  if (isLoading) {
    return <DonutLoader />
  }

  return (
    <section className="home-page">
      <section className="user-section">
        <div className="user-info">
          <h1>@{user.name}!</h1>
          <span>${user.coins.toFixed(3)}</span>
          <br></br>
          <div className="user-actions">
            <button className="action-btn send">Send</button>
            <div className="vertical-divider"></div>

            <button className="action-btn receive">Receive</button>
          </div>
        </div>
      </section>
      <section className="coin-list">
        <div className="coin-list-action">
          <button className="simple-button active">Coins</button>
          <button className="simple-button">Collectibles</button>
        </div>
        <article>
          <div className="coin-info">
            <img src={bitcoinIcon} alt="Bitcoin" />
            <span className="wrapper">
              <span className="coin-name">Bitcoin</span>
              <span className="coin-tag">BTC</span>
            </span>
          </div>
          <span>{bitcoinValue}</span>
        </article>
        <article>
          <div className="coin-info">
            <img src={ethIcon} alt="Bitcoin" />
            <span className="wrapper">
              <span className="coin-name">Ethereum</span>
              <span className="coin-tag">ETH</span>
            </span>
          </div>
          <span>{0.02}</span>
        </article>
        <article>
          <div className="coin-info">
            <img src={usdIcon} alt="Bitcoin" />
            <span className="wrapper">
              <span className="coin-name">UST</span>
              <span className="coin-tag">USDC</span>
            </span>
          </div>
          <span>100</span>
        </article>
        <article>
          <div className="coin-info">
            <img src={cardanoIcon} alt="Bitcoin" />
            <span className="wrapper">
              <span className="coin-name">Cardano</span>
              <span className="coin-tag">ADA</span>
            </span>
          </div>
          <span>258.21</span>
        </article>
        <article>
          <div className="coin-info">
            <img src={xrpIcon} alt="Bitcoin" />
            <span className="wrapper">
              <span className="coin-name">XRP</span>
              <span className="coin-tag">XRP</span>
            </span>
          </div>
          <span>891.2311</span>
        </article>
        <article>
          <div className="coin-info">
            <img src={polygonIcon} alt="Bitcoin" />
            <span className="wrapper">
              <span className="coin-name">Polygon</span>
              <span className="coin-tag">MATIC</span>
            </span>
          </div>
          <span>349.8</span>
        </article>
      </section>
    </section>
  )
}
