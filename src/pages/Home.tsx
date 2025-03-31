import { Header } from "../components/Header/Header";
import { Panel } from "../components/Panel";
import { useDispatch, useSelector } from "react-redux";
import { getMatchById, selectLoader, selectMatch, selectUserActions } from "../store/modules/main";
import { OverlayLoader } from "../components/Loader/OverlayLoader";
import { useEffect } from "react";
import SessionStorageService, { StorageKeys } from "../services/sessionStorageService";
import { joinRoom, sendGameUpdate } from "../services/gameSocket";
import toast, { Toaster } from 'react-hot-toast';


const sessionStorageService = new SessionStorageService();

export function Home() {
  
  const userActions = useSelector(selectUserActions);
  const loader = useSelector(selectLoader);
  const match = useSelector(selectMatch);

  const dispatch = useDispatch();
  const matchId = sessionStorageService.getItem(StorageKeys.MATCH_ID);
  const ownerId = sessionStorageService.getItem(StorageKeys.OWNER_ID);

  useEffect(() => {
    joinRoom(matchId);
    dispatch(getMatchById({matchId, ownerId}));
  }, []);

  const onSavePanel = () => {

    //TODO send actions to the server, but still validate actions

    const validateData = {rob: false, explode: false, selected: false};
    const data = []

    userActions?.forEach((item) => {
      if(item.action === 'rob'){
        validateData.rob = true;
        data.push(item);
      }

      if(item.action === 'explode'){
        validateData.explode = true
        data.push(item);
      }

      if(item.action === 'selected'){
        validateData.selected = true
        data.push(item);
      }
    });

    if(match.firstHalf && (!validateData.rob || !validateData.explode)) {
      toast.error('You need to select both actions: rob and explode');
      return;
    }

    if(!match.firstHalf && !validateData.selected) {
      toast.error('You need to select a block');
      return;
    }


    sendGameUpdate(matchId, ownerId, data)
  }

  const isActive = (index: number) => (match.firstHalf && index === 0) || (!match.firstHalf && index === 1)

 
  return (
    <>
      <div className="w-full sticky top-0"> 
        <Header />
      </div>
      <section className="bg-[#363B4E] h-full w-full">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl text-white py-10">Instructions</h1>
        </div>

        { match && 
        
        <div className="flex flex-col items-center">
          {
            match?.panels.map((panel, index) => (
              <div key={index} className={`mt-2.5 flex flex-col items-center p-3 w-full ${ isActive(index) ? 'bg-[#4d5675]' : '' } `}>
                <Panel panel={panel.boards} isUserPanel={index === 1} isActive={isActive(index)} />
                { isActive(index) ? 
                  <div onClick={onSavePanel} className=" px-10 py-5 bg-[#927FBF] rounded-lg cursor-pointer hover:opacity-50 text-white mt-3">save</div>
                : null }
              </div>
            ))
          }
          
        </div>

        }
        
      </section>
      { loader && <OverlayLoader  />}
      <Toaster />
    </>
  )
}