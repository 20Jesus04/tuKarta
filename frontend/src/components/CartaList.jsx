import React from 'react'
import { Carta } from './Carta';

export const CartaList = ({cartas}) => {
 
  return (
    <>
      <main>
        {cartas.map(carta => (
          <Carta key={carta.id} carta={carta} />
        ))}

      </main>
    </>
  )
}
