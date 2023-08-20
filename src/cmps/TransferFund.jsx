import React, { useState } from 'react';

export function TransferFund({ contact, maxCoins, onTransferCoins }) {
  const [amount, setAmount] = useState('');

  function handleTransfer() {
    if (amount > maxCoins || amount <= 0) {
      alert(`Please enter an amount between 1 and ${maxCoins}`);
      return;
    }
    onTransferCoins(contact, amount);
    setAmount('');
  }

  return (
    <div className="transfer-fund">
      {/* <h4>Transfer funds to {contact.name}</h4> */}
      <input 
        type="number" 
        value={amount} 
        onChange={e => setAmount(e.target.value)} 
        placeholder={`Max: ${maxCoins}`} 
      />
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
}
