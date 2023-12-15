// MODE PROD
import axios from "axios";
import { BASE_URL, USER } from "./config";

export class DataService {
  static async getUser(userId) {
    try {
      // http://localhost:3000/user/12
      const response = await axios.get(`${BASE_URL}${USER}${userId}`);
      return response.data;
    } catch (error) {
      console.error(
        error,
        "Erreur de récupération des données utilisateur depuis l'API"
      );
    }
  }
  static async getUserData(userId, stats = null) {
    try {
      // http://localhost:3000/user/12/average-sessions
      const response = await axios.get(`${BASE_URL}${USER}${userId}${stats}`);
      return response.data;
    } catch (error) {
      console.error(
        error,
        "Erreur de récupération des données utilisateur depuis l'API"
      );
    }
  }
}

// MODE MOCK
// import { userMock } from "../../MockData/MockData";

// export class DataService {
//   static async getUser(userId) {
//     try {
//       return {
//         data: userMock[userId],
//       };
//     } catch (error) {
//       console.error(
//         error,
//         "Erreur de récupération des données utilisateur depuis l'API"
//       );
//     }
//   }
//   static async getUserData(userId, stats = null) {
//     try {
//       return {
//         data: stats[userId],
//       };
//     } catch (error) {
//       console.error(
//         error,
//         "Erreur de récupération des données utilisateur depuis l'API"
//       );
//     }
//   }
// }
