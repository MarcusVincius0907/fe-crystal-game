import { Header } from "../components/Header/Header";
import { Panel } from "../components/Panel";

export function Home() {
  const board = [
    {id: 1, value: '1000', action: null},
    {id: 2, value: '100', action: null },
    {id: 3, value: '50', action: null},
    {id: 4, value: '10', action: null},
    {id: 5, value: '10', action: null},
    {id: 6, value: '1000', action: null},
    {id: 7, value: '50', action: null},
    {id: 8, value: '100', action: null},
    {id: 9, value: '1000', action: null},
  ];
  const board2 = [
    {id: 1, value: null, action: null},
    {id: 2, value: null, action: null },
    {id: 3, value: null, action: null},
    {id: 4, value: null, action: null},
    {id: 5, value: null, action: null},
    {id: 6, value: null, action: null},
    {id: 7, value: null, action: null},
    {id: 8, value: null, action: null},
    {id: 9, value: null, action: null},
  ];
  const panels = [{ boards: [board, board2, board2], active: false }, { boards: [board2, board2, board2], active: true }]
  return (
    <>
      <div className="w-full sticky top-0"> 
        <Header />
      </div>
      <section className="bg-[#363B4E] h-full w-full">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl text-white py-10">Instructions</h1>
        </div>
        <div className="flex flex-col items-center">
          {
            panels.map((panel, index) => (
              <div key={index} className={`mt-2.5 flex flex-col items-center p-3 w-full ${ panel.active ? 'bg-[#4d5675]' : '' } `}>
                <Panel panel={panel.boards} />
                { panel.active ? 
                  <div className=" px-10 py-5 bg-[#927FBF] rounded-lg cursor-pointer hover:opacity-50 text-white mt-3">save</div>
                : null }
              </div>
            ))
          }
          
        </div>
      </section>
    </>
  )
}