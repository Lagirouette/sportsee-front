export interface LoginResponse {
  token: string;
  userId: string;
}

export interface UserInfoResponse {
  profile: {
    firstName: string;
    lastName: string;
    createdAt: string;
    age: number;
    weight: number;
    height: number;
    profilePicture: string;
  };
  statistics: {
    totalDistance: string;
    totalSessions: number;
    totalDuration: number;
  };
}

export interface ActivitySessionResponse {
  date: string;
  distance: number;
  duration: number;
  heartRate: { min: number; max: number; average: number };
  caloriesBurned: number;
}

export interface DataService {
  login(username: string, password: string): Promise<LoginResponse>;
  getUserInfo(): Promise<UserInfoResponse>;
  getUserActivity(startWeek: string, endWeek: string): Promise<ActivitySessionResponse[]>;
}