import React, { useEffect, useState } from 'react'
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'

import './assets/scss/global.scss'
import { HomePage } from './pages/HomePage'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { ContactIndex } from './pages/ContactIndex'
import { ContactDetailsPage } from './pages/ContactDetailsPage'
import { ContactEdit } from './pages/ContactEdit'
import { SignUp } from './pages/SignupPage'
import { MoveList } from './pages/MoveList'
import { BitcoinChart } from './pages/BitcoinChart'

function App() {
  return (
    <Router>
      <section className="main-app">
        {/* <AppHeader /> */}
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/contact" element={<ContactIndex />} />
            <Route path="contact/edit/:id?" element={<ContactEdit />} />
            <Route path="transfer/list" element={<MoveList />} />
            <Route
              path="chart"
              element={
                <BitcoinChart
                  chartName="market-price"
                  timespan="1year"
                  rollingAverage="8hours"
                  start="your_start_date"
                  format="json"
                  sampled="true"
                />
              }
            />
          </Routes>
        </main>
        <AppFooter />
      </section>
    </Router>
  )
}

export default App
