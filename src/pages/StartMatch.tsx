import { joinRoom, startMatch, sendGameUpdate } from "../services/gameSocket";

export function StartMatch(){
    return (
        <div className="h-full w-full bg-[#C4BBF0] flex justify-center items-center">
            <div className="bg-[#4F3B78] text-white p-10 rounded-lg max-w-[500px] w-full ">
                <h1 className="text-3xl text-center">
                    Start Match
                </h1>
                <div className="flex justify-center items-center mt-5">
                    <input className="px-5 py-2 bg-[#C4BBF0] border rounded outline-none text-[#4F3B78]" type="text"  placeholder="Your Name"/>
                </div>
                <div className="flex justify-center items-center mt-5">
                    <div className="bg-[#927FBF] py-2 px-5 text-center rounded cursor-pointer hover:opacity-50">
                        {/* <div className="loader"></div> */}
                        Find Match
                    </div>
                </div>
            </div>

            <div>
                <div onClick={() => joinRoom('123')}>join room</div>
                <div onClick={() => startMatch('123')}>start match</div>
                <div onClick={() => sendGameUpdate('123', { data: 'hello' })}>gameupdate</div>
            </div>
        </div>
    )
}
