var admin = require("firebase-admin");

var serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://web-system-2c128-default-rtdb.asia-southeast1.firebasedatabase.app"
});

export default UserList;