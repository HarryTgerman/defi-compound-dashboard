import Compound from '@compound-finance/compound-js'
import calculateApy from '../apy'
import styles from '../styles/Home.module.css'

export default function Home({ apys }) {
  const formatPercent = (num) => `${new Number(num).toFixed(2)}%`
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Supply APY</th>
            <th>COMP APY</th>
            <th>Total AP</th>
          </tr>
        </thead>
        <tbody>
          {apys.map(apy => (
            <tr key={apy.ticker} >
              <td>{apy.ticker.toUpperCase()}</td>
              <td>{formatPercent(apy.supplyApy)}</td>
              <td>{formatPercent(apy.compApy)}</td>
              <td>{formatPercent(parseFloat(apy.supplyApy) + parseFloat(apy.compApy))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export async function getServerSideProps(context) {
  const apys = await Promise.all([
    calculateApy(Compound.cDAI, 'DAI'),
    calculateApy(Compound.cUSDC, 'USDC'),
    calculateApy(Compound.cUSDT, 'USDT'),
  ]);

  return {
    props: {
      apys
    },
  }
}