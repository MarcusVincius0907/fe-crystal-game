import { useState } from 'react';
import './Board.css';

export function Board(props: { board: string[] }) {
  const [selectedBlock, setSelectedBlock] = useState('');
  return (
    <div className='flex flex-wrap w-[310px] h-[310px] gap-1'>
        {props.board.map((value, index) => (
            <div key={index} className={`gradient-bg  h-[100px] w-[100px] rounded-lg text-white text-center flex justify-center items-center`}>
              {value}
            </div>
        ))}
    </div>
  )
}
