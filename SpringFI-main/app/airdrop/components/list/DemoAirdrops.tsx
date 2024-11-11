import React from 'react'
import AirDropCard from '../AirDropCard'
import CardsWrapper from '../CardsWrapper'

const DemoAirdrops = () => {
  return (
    <CardsWrapper>
          <>
            <AirDropCard
              currency={"Ethereum"}
              key={1}
              id={1}
              imgHref={"https://picsum.photos/seed/1/800/400"}
              title={"AirDrop 2"}
              token={"Token 2"}
              totalTokens={150}
              participants={130}
              starTime={1631000000}
              bg={"/PlaceholderCardBg.png"}
            />

            <AirDropCard
              currency={"Cardano"}
              key={2}
              id={2}
              imgHref={"https://picsum.photos/seed/2/800/400"}
              title={"AirDrop 3"}
              token={"Token 3"}
              totalTokens={200}
              participants={140}
              starTime={1632000000}
              bg={"/PlaceholderCardBg.png"}
            />

            <AirDropCard
              currency={"Solana"}
              key={3}
              id={3}
              imgHref={"https://picsum.photos/seed/3/800/400"}
              title={"AirDrop 4"}
              token={"Token 4"}
              totalTokens={180}
              participants={160}
              starTime={1633000000}
              bg={"/PlaceholderCardBg.png"}
            />

            <AirDropCard
              currency={"Binance Coin"}
              key={4}
              id={4}
              imgHref={"https://picsum.photos/seed/4/800/400"}
              title={"AirDrop 5"}
              token={"Token 5"}
              totalTokens={250}
              participants={180}
              starTime={1634000000}
              bg={"/PlaceholderCardBg.png"}
            />

            <AirDropCard
              currency={"Ripple"}
              key={5}
              id={5}
              imgHref={"https://picsum.photos/seed/5/800/400"}
              title={"AirDrop 6"}
              token={"Token 6"}
              totalTokens={300}
              participants={200}
              starTime={16}
              bg={"/PlaceholderCardBg.png"}
            />
          </>
        </CardsWrapper>
  )
}

export default DemoAirdrops