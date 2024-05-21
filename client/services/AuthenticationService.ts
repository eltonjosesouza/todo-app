import { Meteor } from "meteor/meteor";

export class AuthenticationService {
  static login(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      Meteor.loginWithPassword(email, password, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}
