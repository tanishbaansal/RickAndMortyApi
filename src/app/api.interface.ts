//An interface of the episodes Data
interface EpisodeData {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

//An interface for episodes info
interface EpisodesInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

// //interface for character data
// export interface CharacterData {
//   id: number;
//   name: string;
//   status: string;
//   species: string;
//   type: string;
//   gender: string;
//   origin: string[];
//   location: string[];
//   image: string;
//   episode: string[];
//   url: string;
//   created: string;
// }

//An interface for the list episodes where
//we get result of all list of episodes
export interface AllEpisodes {
  info: EpisodesInfo;
  results: EpisodeData[];
}
