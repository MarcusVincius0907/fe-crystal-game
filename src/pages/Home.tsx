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
  const panels = [{ boards: [board, board, board], active: true }, { boards: [board, board, board], active: false }]
  return (
    <>
      <section className="bg-[#363B4E] h-full w-full">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl text-white py-10">Instructions</h1>
        </div>
        <div className="flex flex-col items-center">
          {
            panels.map((panel, index) => (
              <div key={index} className={`mt-2.5 flex justify-center p-3 w-full ${ panel.active ? 'bg-[#4d5675]' : '' } `}>
                <Panel panel={panel.boards} />
              </div>
            ))
          }
          
        </div>
      </section>
    </>
  )
}