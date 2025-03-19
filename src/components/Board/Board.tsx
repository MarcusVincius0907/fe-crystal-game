import { useState } from 'react';
import './Board.css';

export function Board(props: { board: any}) {

  const [localBoards, setLocalBoards] = useState(props.board);
  const [options, setOptions] = useState({
    isRobAvailable: true,
    isExplodeAvailable: true,
  })

  const onBlockClick = (index) => {

    if(localBoards[index].action !== null){
      if(localBoards[index].action === 'rob'){
        const optionsCopy = {...options};
        optionsCopy.isRobAvailable = true;
        setOptions(optionsCopy);
        localBoards[index].action = null;
        setLocalBoards([...localBoards]);
      }

      if(localBoards[index].action === 'explode'){
        const optionsCopy = {...options};
        optionsCopy.isExplodeAvailable = true;
        setOptions(optionsCopy);
        localBoards[index].action = null;
        setLocalBoards([...localBoards]);
      }
      return;
    } 

    if(options.isRobAvailable){
      const optionsCopy = {...options};
      optionsCopy.isRobAvailable = false;
      setOptions(optionsCopy);

      localBoards[index].action = 'rob'
      setLocalBoards([...localBoards]);
    } else if(options.isExplodeAvailable){

      const optionsCopy = {...options};
      optionsCopy.isExplodeAvailable = false;
      setOptions(optionsCopy);

      localBoards[index].action = 'explode'
      setLocalBoards([...localBoards]);
    } else {
      if(localBoards[index].action === 'rob'){
        const optionsCopy = {...options};
        optionsCopy.isRobAvailable = true;
        setOptions(optionsCopy);
        localBoards[index].action = null;
        setLocalBoards([...localBoards]);
      }else if(localBoards[index].action === 'explode'){
        const optionsCopy = {...options};
        optionsCopy.isExplodeAvailable = true;
        setOptions(optionsCopy);
        localBoards[index].action = null;
        setLocalBoards([...localBoards]);
      }
    }

  }

  return (
    <div className='flex flex-wrap w-[310px] h-[310px] gap-1'>
        {localBoards.map((item, index) => (
            <div onClick={() => item.value && onBlockClick(index)} key={index} style={{ backgroundColor:  item.action ? '#C4BBF0' : '#927FBF'}} className={` cursor-pointer h-[100px] w-[100px] rounded-lg text-white text-center flex flex-col justify-center items-center`}>
              {
                item.value !== null ? 
                <>
                  <div>{item.value}</div> 
                  <div>{ item.action }</div>
                </> : 
                <>
                  <div className='my-class'>
                    {/* <i className="fa-solid fa-infinity"></i> */}
                    <i className="fa-solid fa-question"></i>
                  </div>
                </>
              }
              
              
            </div>
        ))}
    </div>
  )
}
