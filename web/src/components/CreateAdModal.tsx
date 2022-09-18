import * as Checkbox from '@radix-ui/react-checkbox'
import * as Dialog from '@radix-ui/react-dialog'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Check, GameController } from 'phosphor-react'
import { FormEvent, useEffect, useState } from 'react'
import { api } from '../services/api'
import { Input } from './Form/Input'

export interface Game {
  id: string;
  name: string;
}

export const CreateAdModal = () => {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  useEffect(() => {
    api.get('http://localhost:3000/games')
    .then(response => setGames(response.data))
  }, [])

  const handleCreateAd = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if (!data.name) {
      return;
    }

    const body = {
      ...data,
      yearsPlaying: Number(data.yearsPlaying),
      weekDays: weekDays.map(Number),
      useVoiceChannel
    }

    try {
      await api.post(`/games/${data.game}/ads`, body);
      alert('Anúncio criado com sucesso!')
    } catch (error) {
      console.log(error)
      alert('Erro ao criar o anúncio')
    }


  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50' />

      <Dialog.Content
        className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25'>

        <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

        <form onSubmit={e => handleCreateAd(e)} className="mt-8">
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="game">Qual o game?</label>
            <select
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
              id="game"
              defaultValue=""
              name="game"
            >
              <option disabled value="">Selecione o game que deseja jogar</option>
              {
                games.map(game => (<option key={game.id} value={game.id}>{game.name}</option>))
              }
            </select>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="font-semibold" htmlFor="name">Seu nome (ou nickname) ?</label>
            <Input type="text" id="name" name="name" placeholder='Como te chamam dentro do game?' />
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <Input type="number" name="yearsPlaying" id="yearsPlaying" placeholder='Tudo bem ser ZERO' />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="discord">Qual seu discord?</label>
              <Input type="text" name="discord" id="discord" placeholder='Usuário#0000' />
            </div>
          </div>

          <div className="flex gap-6 mt-4">
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root
                value={weekDays}
                onValueChange={value => setWeekDays(value)}
                type='multiple' 
                className='grid grid-cols-4 gap-2'>
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Terça"
                  className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quarta"
                  className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Quinta"
                  className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title="Sexta"
                  className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title="Sábado"
                  className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-semibold" htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="time" name="hourStart" id="hourStart" placeholder='De' />
                <Input type="time" name="hourEnd" id="hourEnd" placeholder='Até' />
              </div>
            </div>
          </div>

          <label className="mt-6 flex items-center gap-2 text-sm">
            <Checkbox.Root 
              className="w-6 h-6 p-1 rounded bg-zinc-900"
              checked={useVoiceChannel}
              onCheckedChange={(checked) => checked == true ? setUseVoiceChannel(true) : setUseVoiceChannel(false)}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-8 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
            <button
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
              type='submit'>
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>

        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}