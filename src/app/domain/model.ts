import { PokemonData } from './pokemon-data';

export type Party = PartyMember[];

export type PartyMember = PokemonData | null;

export const initialParty: Party = [];

export type Enemies = PokemonData[];

export type PokemonMatch = 'win' | 'loss' | null;
