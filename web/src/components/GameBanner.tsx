
interface GameBannerProps {
  name: string;
  advertisementsQuantity: number;
  bannerURL: string;
}

export const GameBanner = ({ name, advertisementsQuantity, bannerURL }: GameBannerProps) => {
  return(
    <a href="#" className='relative  rounded-lg overflow-hidden'>
      <img src={bannerURL} alt="" />
      <div className="w-full pt-16 pb-4 px-4 bg-gameGradient absolute bottom-0 left-0">
        <strong className='font-bold text-white block'>{name}</strong>
        <span className='text-zinc-300 text-sm'>{advertisementsQuantity} anúncio(s)</span>
      </div>
    </a>
  )
}