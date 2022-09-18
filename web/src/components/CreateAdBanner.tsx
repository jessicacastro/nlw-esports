import { MagnifyingGlassPlus } from "phosphor-react"
import * as Dialog from '@radix-ui/react-dialog'

export const CreateAdBanner = () => {
  return(
    <div className="pt-1 bg-nlwGradient self-stretch mt-8 rounded-lg overflow-hidden">
      <section className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
        <div>
          <strong className='text-2xl text-white font-black'>Não encontrou seu duo?</strong>
          <p className='text-zinc-400 text-sm'>Publique um anúncio para encontrar novos players!</p>
        </div>

        <Dialog.Trigger className='py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-600 flex items-center gap-3'>
          <MagnifyingGlassPlus size="24" />
          Publicar anúncio
        </Dialog.Trigger>
      </section>
    </div>
  )
}