import axios from "axios";
import { BASE_URL } from "./config";

export class Data {
  static async getUser(userId) {
    try {
      const response = await axios.get(`${BASE_URL}${userId}`);
      return response.data;
    } catch (error) {
      console.error(
        error,
        "Erreur de récupération des données utilisateur depuis l'API"
      );
    }
  }
}
