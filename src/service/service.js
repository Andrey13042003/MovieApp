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
    const url = `${baseURL}search/movie?api_key=${apiKey}&include_adult=false&query=${valueSearch}&page=${pageNumber}`;
    const body = await this.getResource(url);

    return body;
  };

  getFilmGenre = async () => {
    const url = `${baseURL}genre/movie/list?api_key=${apiKey}&language=en-US`;
    const body = await this.getResource(url);

    return body.genres;
  };

  getGuestSessionId = async () => {
    const url = `${baseURL}authentication/guest_session/new?api_key=${apiKey}`;
    const body = await this.getResource(url);

    return body;
  };

  getFilmRate = async (sessionId) => {
    const url = `${baseURL}guest_session/${sessionId}/rated/movies?api_key=${apiKey}&language=en-US&sort_by=created_at.asc`;
    const body = await this.getResource(url);

    return body;
  };

  postFilmRate = async (movieId, sessionId, rating) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${sessionId}`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: rating,
      }),
    }).catch((err) => {
      throw new Error('unsuccussed fetch request', err.message);
    });
  };

  deleteRateMovie = async (id, guestSessionToken) => {
    const url = `${baseURL}movie/${id}/rating?api_key=${apiKey}&guest_session_id=${guestSessionToken}`;
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    await fetch(url, {
      method: 'DELETE',
      headers,
    });
  };
}
