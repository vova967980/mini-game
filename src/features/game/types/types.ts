export type GameSpeed = number | null;
export type GameCellStatus = 'idle' | 'success' | 'miss';
export type GameCellsList = GameCellStatus[];

export type GameScoreType = {
    player: number;
    computer: number;
};

export type WinnerType = 'player' | 'computer' | null;
