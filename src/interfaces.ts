export interface Player {
    id: number,
    name: string,
    team: string
}

export interface TeamRole {
    id: number,
    label: string,
    players: Player[]
}