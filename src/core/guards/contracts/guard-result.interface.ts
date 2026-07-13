export interface GuardResult {

  allowed:boolean;

  reason_code:string;

  metadata?: Readonly<Record< string, unknown>
    >;

}