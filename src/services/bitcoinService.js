import axios from 'axios';

export async function getRate(amountInUSD) {
  try {
    const url = `https://blockchain.info/tobtc?currency=USD&value=${amountInUSD}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('An error occurred while fetching the conversion rate:', error);
    throw error;
  }
}

export async function getMarketPrice(timeSpan = '6months') {
  if (Cache[timeSpan]) {
      console.log(
          'returning from cache data about bitcoin for timespan of ' +
          timeSpan
      )
      return cache[timeSpan]
  }
  const url = `https://api.blockchain.info/charts/market-price?timespan=${timeSpan}&format=json&cors=true`
  const res = await axios.get(url)
  return res.data.values
}
export async function getConfirmedTransactions() {}
