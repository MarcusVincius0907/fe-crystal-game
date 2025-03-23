import { use, useEffect, useState } from 'react';
import './Board.css';
import { useDispatch } from 'react-redux';
import { setUserActions } from '../../store/modules/main';
import { deepCopy } from '../../utils';



export function Board(props: { board: any, isUserPanel: boolean }) {
  const dispatch = useDispatch();
  const [localBoards, setLocalBoards] = useState(deepCopy(props?.board?.blocks));
  const [options, setOptions] = useState({
    isRobAvailable: true,
    isExplodeAvailable: true,
  })

  useEffect(() => {
    dispatch(setUserActions(localBoards));
  }, [localBoards]);

  const onBlockClick = (index, value) => {

    if(!props.isUserPanel && value === '') return;
    else if(props.isUserPanel && value === ''){

      //TODO continue here

      const optionsCopy = {...options};
      optionsCopy.isSelectedAvailable = false;
      setOptions(optionsCopy);

      const localBoardsCopy = deepCopy(localBoards);
      localBoardsCopy[index].action = 'selected';
      setLocalBoards([...localBoardsCopy]);
      return;

    }

    if(localBoards[index].action !== ''){
      if(localBoards[index].action === 'rob'){
        const optionsCopy = {...options};
        optionsCopy.isRobAvailable = true;
        setOptions(optionsCopy);
        const localBoardsCopy = deepCopy(localBoards);
        localBoardsCopy[index].action = '';
        setLocalBoards([...localBoardsCopy]);
      }

      if(localBoards[index].action === 'explode'){
        const optionsCopy = {...options};
        optionsCopy.isExplodeAvailable = true;
        setOptions(optionsCopy);
        const localBoardsCopy = deepCopy(localBoards);
        localBoardsCopy[index].action = '';
        setLocalBoards([...localBoardsCopy]);
      }

      return;
    } 

    if(options.isRobAvailable){
      const optionsCopy = {...options};
      optionsCopy.isRobAvailable = false;
      setOptions(optionsCopy);

      const localBoardsCopy = deepCopy(localBoards);
      localBoardsCopy[index].action = 'rob'
      setLocalBoards([...localBoardsCopy]);
    } else if(options.isExplodeAvailable){

      const optionsCopy = {...options};
      optionsCopy.isExplodeAvailable = false;
      setOptions(optionsCopy);

      const localBoardsCopy = deepCopy(localBoards);
      localBoardsCopy[index].action = 'explode'
      setLocalBoards([...localBoardsCopy]);
    } else {
      if(localBoards[index].action === 'rob'){
        const optionsCopy = {...options};
        optionsCopy.isRobAvailable = true;
        setOptions(optionsCopy);
        const localBoardsCopy = deepCopy(localBoards);
        localBoardsCopy[index].action = '';
        setLocalBoards([...localBoardsCopy]);
      }else if(localBoards[index].action === 'explode'){
        const optionsCopy = {...options};
        optionsCopy.isExplodeAvailable = true;
        setOptions(optionsCopy);
        const localBoardsCopy = deepCopy(localBoards);
        localBoardsCopy[index].action = '';
        setLocalBoards([...localBoardsCopy]);
      }
    }

  }


  return (
    <div className='flex flex-wrap w-[310px] h-[310px] gap-1'>
        {localBoards && localBoards?.length && localBoards?.map((item, index) => (
            <div onClick={() => onBlockClick(index, item.value)} key={index} style={{ backgroundColor:  item.action ? '#C4BBF0' : '#927FBF'}} className={` cursor-pointer h-[100px] w-[100px] rounded-lg text-white text-center flex flex-col justify-center items-center`}>
              {
                item.value ? 
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
