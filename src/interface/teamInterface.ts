export interface Team {
  id: number;
  name: string;
  nickname: string;
  code: string;
  logo: string;
  city: string;
  allstar: boolean;
  nbaFranchise: boolean;
}

export interface Team_response {
  response: Team[];
}
