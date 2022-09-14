import { Component, OnInit } from '@angular/core';

export async function CallApi<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}

interface episodesData {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}
interface rickandmortyapi {
  info: string;
  results: episodesData[];
}
// example consuming code
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Rick And Morty API';

  async ngOnInit() {
    // Handling errors outside:
    const responseDate = await CallApi<rickandmortyapi>(
      'https://rickandmortyapi.com/api/episode'
    );
    Object.entries(responseDate).forEach(([key, value]) => {
      // console.log(value);
    });
    console.log(responseDate.results[0].characters);
    console.log(responseDate);
  }
}
