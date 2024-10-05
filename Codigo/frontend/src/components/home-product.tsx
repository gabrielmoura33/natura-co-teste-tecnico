import Rating from './ui/rating'

export function HomeProduct() {
  return (
    <div className="w-full flex align-center flex-col gap-4">
      <div className="h-full w-full">
        <img
          src="https://m.media-amazon.com/images/I/51zB3lt+upL.jpg"
          alt="asdjnasjkd"
          className="h-full w-full rounded-2xl"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold ">Essencial Masculino 100ml</h1>
        <div className="mt-2 flex flex-col gap-4">
          <Rating rating={4} />
          <span className="text-xl font-bold ">R$212,00</span>
        </div>
      </div>
    </div>
  )
}
