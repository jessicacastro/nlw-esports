import { useEffect, useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'

import logoImg from './assets/logo.svg'

import './styles/main.css'
import { GameController } from 'phosphor-react'
import { Input } from './components/Form/Input'
import { CreateAdModal } from './components/CreateAdModal'
import { api } from './services/api'


interface Game {
  id: string;
  name: string;
  _count: {
    Advertisements: number;
  }
  bannerURL: string;
}

export const App = () => {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    api.get('http://localhost:3000/games')
      .then(response => setGames(response.data))
  }, [])

  return (
    <main className='max-w-[1344px] mx-auto flex flex-col items-center py-20'>
      <img src={logoImg} alt="NLW E-Sports" />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span role="text" className='bg-nlwGradient text-transparent bg-clip-text'>duo</span> está aqui!
      </h1>

      <section className='grid grid-cols-6 gap-6 mt-16'>
        {
          games.map(game => (
            <GameBanner
              bannerURL={game.bannerURL}
              name={game.name}
              advertisementsQuantity={game._count.Advertisements}
              key={game.id}
            />
          ))
        }
      </section>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>

    </main>
  )
}
