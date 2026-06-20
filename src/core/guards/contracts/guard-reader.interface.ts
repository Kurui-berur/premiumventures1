export interface GuardReader {

  snapshot():
  Readonly<
    Record<
      string,
      unknown
    >
  >;

}