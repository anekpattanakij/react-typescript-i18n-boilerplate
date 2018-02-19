export default class Language {
  constructor(language: string, readyStatus: string, err?: Array<Error>) {
    this.language = language;
    this.readyStatus = readyStatus;
    this.err = err;
  }
  private language: string;
  private readyStatus: string;
  private err: Array<Error>;

  setLanguge = (
    language: string,
    readyStatus: string,
    err?: Array<Error>,
  ): void => {
    this.language = language;
    this.readyStatus = readyStatus;
    this.err = err;
  }
}
