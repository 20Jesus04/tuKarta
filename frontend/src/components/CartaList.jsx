import React from 'react'
import { Carta } from './Carta';

export const CartaList = ({cartas}) => {
  return (
    <>
      <main>
        {cartas.map(carta => (
          <Carta key={carta.id} carta={carta} />
        ))}

        <a href="#top" className="scrollTopButton">
          <i className="fa fa-arrow-up fa-2x"></i>
        </a>
      </main>
    </>
  )
}
