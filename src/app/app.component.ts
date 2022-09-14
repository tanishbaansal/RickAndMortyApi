import { Component, OnInit } from '@angular/core';
import { AllEpisodes } from './api.interface';

//A simple function to call the api to fetch data from a url
async function CallApi<T>(url: RequestInfo): Promise<T> {
  const response = await fetch(url);
  return await response.json();
}

// let allCharacterData: { [id: string]: CharacterData } = {};
async function getAllEpisodesData<T>(): Promise<AllEpisodes> {
  //Initially calling the first page api endpoint to count of total episodes
  // and number of pages
  let allData = await CallApi<AllEpisodes>('/api/episode');

  //Then loop over the pages and get data from all pages
  for (let i = 2; i <= allData.info.pages; i++) {
    //Then appending allData with new pages data
    allData.results = [
      ...allData.results,
      ...(await (await CallApi<AllEpisodes>(`/api/episode?page=${i}`)).results),
    ];
  }

  return allData;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Rick And Morty API';

  async ngOnInit() {
    // Getting All episodes Data
    const allEpisodesData = await getAllEpisodesData<AllEpisodes>();

    //Looping over allEpisodesData to update the data with character Data
    allEpisodesData.results.forEach((episode) => {
      episode.characters.forEach(async (episodeUrl, index) => {
        //Calling api to get character data
        let characterData = await CallApi<string>(
          episodeUrl.replace('https://rickandmortyapi.com/', '/')
        );

        episode.characters[index] = characterData;
        // Implementing sleep cause calling the api multiple times was
        // giving 429 too many request
        const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
        sleep(1000);
      });
    });
    console.log(
      '%c ---- The Resulted Array ---- ',
      'background: #222;color:#fff'
    );
    console.log(allEpisodesData);
  }
}
