// MODE PROD
import axios from "axios";
import { BASE_URL, USER } from "./config";

export class DataService {
  // Méthode statique pour obtenir les informations principales d'un utilisateur.
  static async getUser(userId) {
    try {
      // http://localhost:3000/user/12
      // Construction de l'URL pour la requête API.
      const response = await axios.get(`${BASE_URL}${USER}${userId}`);
      // Retourne les données obtenues de la réponse
      return this.dataTransformer(response.data);
    } catch (error) {
      // En cas d'erreur, affiche l'erreur dans la console.
      console.error(
        error,
        "Erreur de récupération des données utilisateur depuis l'API"
      );
    }
  }
  // Méthode statique pour obtenir différents types de données relatives à un utilisateur.
  static async getUserData(userId, stats = null) {
    try {
      // http://localhost:3000/user/12/average-sessions
      // Construction de l'URL pour la requête API avec un paramètre supplémentaire 'stats'.
      const response = await axios.get(`${BASE_URL}${USER}${userId}${stats}`);
      return this.dataTransformer(response.data)
    } catch (error) {
      console.error(
        error,
        "Erreur de récupération des données utilisateur depuis l'API"
      );
    }
  }

  
// mappage des données 
//EXEMPLE de données transformées
  static dataTransformer(response) {
    // Si besoin de modifier une data en back, commenter le return ci-dessous et décommenter le return suivant
    return response;
    //Dans cet exemple, on renomme la clé 'informations' en 'userInfos'
      // return {
      //   data: {
      //     ...response.data,
      //     userInfos: response.data.informations,
      //   }
      // };
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
