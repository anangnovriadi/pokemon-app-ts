import React from 'react';
import { useState, useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import Card from '../components/Card';

const Home: React.FC = () => {
  const [data, setData] = useState([]);
  let [limit, setLimit] = useState<Number>(8);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const json = await response.json();
      
    setData(json.results);
  }

  const fetchDataMore = async () => {
    try {
      setLimit(prev => Number(prev) + 2)
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${Number(limit) + 2}`);
      const json = await response.json();
      
      setData(json.results);
    } catch (err) {
      throw err;
    }
  }

  return (
    <>
      <div className="mt-8 mb-8 px-8">
        <InfiniteScroll
          dataLength={data.length}
          next={fetchDataMore}
          hasMore={true}
          loader={<div className="text-center mt-8 mb-5">Loading....</div>}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-5">
            {data && data.map((val: Data, i: number) => {
              return(
                <Card name={val.name} index={i + 1} />
              )
            })}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}

interface Data {
  name: string;
  url: string;
}

export default Home;
