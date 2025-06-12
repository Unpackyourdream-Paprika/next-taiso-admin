import axios, { AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.12:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 데이터 타입
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// 체조장 게시글 등록시
export interface CreateBoardResponse {
  success: boolean;
  message: string;
}

// 회원가입 로그인 , 회원가입  응답 데이터 타입
export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    accessToken?: string;
  };
}

export interface Region {
  regionId: number;
  regionName: string;
}

export interface CityData {
  cityId: number;
  region: Region[];
}

export interface RegionApiResponse {
  success: boolean;
  message: string;
  data: {
    [key: string]: CityData;
  };
}
