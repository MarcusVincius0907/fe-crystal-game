import { Board } from "./Board/Board";

export function Panel(props: { panel: any }) {
    

    return (
        <div className="flex gap-2">
            {props.panel.map((board, index) => (
                <Board key={index} board={board} />
            ))}
        </div>
    )
}