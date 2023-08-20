import React, { useEffect, useState } from 'react';
import { DonutLoader } from '../cmps/DonutLoader';
import { Navigate } from 'react-router-dom';
import { userService } from '../services/userService';

export function MoveList() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        ;(async () => {
          try {
            const loadedUser = await userService.getUser()
            setUser(loadedUser)
          } catch {
            console.log('Failed to load user')
          } 
        })()
      }, [])
if(!user) return <DonutLoader />
  return (
    <div className="move-list">
      <h2>Your Moves</h2>
      <table>
        <thead>
          <tr>
            <th>To</th>
            <th>Amount</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {user.moves.map((move, index) => (
            <tr key={index}>
              <td>{move.to}</td>
              <td>{move.amount}$</td>
              <td>{new Date(move.at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
