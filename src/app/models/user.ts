
// export function IsAdminUser(user: CognitoUser) {
//   const sess = user.getSignInUserSession();
//   const idToken = sess.getIdToken();
//   const payload = idToken.decodePayload();

//   const neededClaims: string[] = [
//     """:role",
//     "cognito:username"
//   ];

// }

export interface UserProperties {
  Username: string;
  UserId: string;
  FirstName: string;
  LastName: string;
  // ""Role: ""Role;
}
