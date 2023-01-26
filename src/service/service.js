const apiKey = 'fb4d75cd69c03ca25ffd80a9a43fd159';
const baseURL = 'https://api.themoviedb.org/3/';
export default class Service {
  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('invalid', res.status);
    }
    const body = await res.json();
    return body;
  }

  getPopularFilms = async (pageNumber) => {
    const url = `${baseURL}movie/popular?api_key=${apiKey}&language=en-US&page=${pageNumber}`;
    const body = await this.getResource(url);

    return body;
  };

  getRequestFilms = async (valueSearch, pageNumber) => {
    //значение из input, номер страницы
    const url = `${baseURL}search/movie?api_key=${apiKey}&include_adult=false&query=${valueSearch}&page=${pageNumber}`;
    const body = await this.getResource(url);

    return body;
  };
}
