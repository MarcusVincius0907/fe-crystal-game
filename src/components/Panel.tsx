import { Board } from "./Board/Board";

export function Panel(){
    const board = ['1000', '100', '50', '1000', '100', '50', '1000', '100', '50'];
    const panel = [board, board, board];

    return (
        <div className="flex gap-2">
            {panel.map((board, index) => (
                <Board key={index} board={board} />
            ))}
        </div>
    )
}