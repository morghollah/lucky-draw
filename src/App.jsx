import React, { useState, useEffect } from 'react';

const App = () => {
  const initialOdds = [
    { id: 9, name: "Grenade", chance: 28, isSelected: false },
    { id: 6, name: "Calling Card", chance: 6.5, isSelected: false },
    { id: 7, name: "Wingsuit", chance: 10, isSelected: false },
    { id: 5, name: "Epic Gun 2", chance: 5.5, isSelected: false },
    { id: 1, name: "Mythic Gun", chance: 0.08, isSelected: false },
    { id: 2, name: "Character Skin", chance: 1.25, isSelected: false },
    { id: 10, name: "Charm", chance: 29, isSelected: false },
    { id: 3, name: "Epic Gun", chance: 4, isSelected: false },
    { id: 8, name: "Emote", chance: 11, isSelected: false },
    { id: 4, name: "Knife", chance: 4.67, isSelected: false }
  ];

  const [odds, setOdds] = useState(initialOdds);

  const [isDrawing, setIsDrawing] = useState(false);

  const handleDraw = () => {
    setIsDrawing(true);

    const weights = [...odds].sort((a, b) => a.id - b.id);
    console.log(weights);

    const total = weights.reduce((acc, value) => acc + value.chance, 0);
    console.log(`total: ${total}`);

    const random = Math.random() * total;
    console.log(`random: ${random}`);

    for (let i = 0, sum = 0; i < weights.length; i++) {
      sum += weights[i].chance;
      console.log(sum);
      if (random < sum) {
        console.log(`selected: ${weights[i].chance} - ${weights[i].name}`);
        setOdds((prev) => prev.map((value) => value.id === weights[i].id ? { ...value, chance: 0, isSelected: true } : { ...value, chance: (value.chance / (total - weights[i].chance)) * total }));
        break;
      }
    }

    setIsDrawing(false);
  };

  useEffect(() => {
    console.log(odds);
  }, [odds]);

  return (
    <div className='w-screen bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 text-neutral-100'>
      <div className='w-full max-w-lg mx-auto min-h-screen p-4 flex flex-col items-center justify-evenly'>
        {/*  */}
        <div className='w-full'>
          <h1 className='text-center text-lg uppercase tracking-[4px]'>codm mythic draw mimic</h1>
        </div>
        {/*  */}
        <div className='w-full grid grid-cols-2 grid-rows-5 justify-items-center gap-4'>{odds.map((value, index) => {
          let background = "";

          switch (value.id) {
            case 1:
              background = "bg-gradient-to-br from-red-300/75 via-red-500/75 to-red-500/75";
              break;
            case 2:
              background = "bg-gradient-to-br from-purple-300/75 via-purple-500/75 to-purple-600/75";
              break;
            default:
              background = "bg-neutral-600/25 backdrop-blur-xs";
              break;
          }

          return (
            <div
              key={index}
              className={`relative w-full rounded h-[60px] border-2 border-neutral-400 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition duration-150 ${background} ${value.isSelected && 'opacity-50 border-yellow-500'}`}
            >
              <h3>{value.name}</h3>
              {value.isSelected && <span className='absolute text-yellow-500 uppercase text-sm font-bold tracking-[4px]'>recieved</span>}
              <p className='text-xs'>{`${value.chance.toFixed(2)}%`}</p>
            </div>
          );
        })}</div>
        {/*  */}
        <div className='w-full flex flex-row gap-4'>
          <button
            onClick={() => setOdds(initialOdds)}
            className='w-full rounded border-2 border-neutral-400 p-4 font-light uppercase cursor-pointer active:scale-95 transition duration-150 bg-neutral-600/25 backdrop-blur-xs'
          >
            reset
          </button>
          <button
            onClick={handleDraw}
            disabled={isDrawing || odds.every((value) => value.isSelected)}
            className='w-full rounded border-2 border-neutral-400 p-4 font-light uppercase cursor-pointer active:scale-95 transition duration-150 bg-neutral-600/25 backdrop-blur-xs'
          >
            {odds.every((value) => value.isSelected) ? 'full' : 'draw'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;