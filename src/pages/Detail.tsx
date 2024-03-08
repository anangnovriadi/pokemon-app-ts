import React from 'react';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Chart from 'react-apexcharts'

const Detail: React.FC = () => {
  let { id } = useParams();

  const [detail, setDetail] = useState<DetailOrTypes>({ name: '' });
  const [types, setTypes] = useState<DetailOrTypes[]>([]);
  const [stats, setStats] = useState<Stats>({
    options: {
      chart: {
        id: 'apexchart-example'
      },
      xaxis: {
        categories: []
      }
    },
    series: [{
      name: 'series-1',
      data: []
    }]
  })

  useEffect(() => {
    try {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then((json) => {
          setDetail(json);

          const nameStats = json.stats.map((val: NameStats) => val.stat.name);
          const baseStats = json.stats.map((val: BaseStats) => val.base_stat);

          setStats({
            ...stats,
            options: {
              chart: {
                id: 'apexchart-example'
              },
              xaxis: {
                categories: nameStats
              }
            },
            series: [{
              name: 'series-1',
              data: baseStats
            }]
          });

          setTypes(json.types.map((val: TypesJson) => {
            return { name: val.type.name }
          }));
        });
    } catch (err) {
      throw err;
    }
  }, []);

  return (
    <>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="px-5 pt-12 pb-12 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full">
              <Carousel showArrows={false} showThumbs={false} showStatus={false} autoPlay={true}>
                <div>
                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" />
                </div>
                <div>
                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png" />
                </div>
              </Carousel>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-700 tracking-widest uppercase font-bold pb-4">{detail.name}</h2>
              <p className="text-gray-500 ">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
              <div className="pt-4">
                <p className="pt-5 pb-2">Types</p>
                <div className="pt-2 pb-2">
                  {types.map((val: DetailOrTypes, _i: number) => {
                    return(
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{val.name}</span>
                    )
                  })}
                </div>
              </div>
              <div className="pt-8 mb-4">
                <p>Stats</p>
                <Chart options={stats.options} series={stats.series} type="bar" width={'100%'} height={320} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

interface DetailOrTypes {
  name: string;
}

interface TypesJson {
  type: {
    name: string;
  }
}

interface Stats {
  options: {
    chart: {
      id: string
    },
    xaxis: {
      categories: Array<string>
    }
  },
  series: Array<{
    name: 'series-1',
    data: []
  }>
}

interface BaseStats {
  base_stat: string
}

interface NameStats {
  stat: {
    name: string;
  }
}

export default Detail;
