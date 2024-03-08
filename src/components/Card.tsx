import { Link } from "react-router-dom";

const Card = ({ index, name }: CardProps) => {
  return (
    <>
      <Link to={`/detail/${index}`}>
        <div key={index} className="text-left">
          <div className="md:max-w-sm rounded-md overflow-hidden shadow-lg">
            <img className="w-full object-cover" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 uppercase">{name}</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
              </p>
            </div>
          </div>
        </div>
      </Link> 
    </>
  )
}

interface CardProps {
  index: number;
  name: string;
}

export default Card;
  