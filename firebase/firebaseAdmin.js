import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const appAdmin = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert({
        type: "service_account",
        project_id: "evil-corp-89904",
        private_key_id: "82eb91c38e80dd9b6f2e260f65945461a8200cea",

        private_key: process.env.FIREBASE_PRIVATE_KEY,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: "108630332526393339740",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url:
          "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url:
          "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40evil-corp-89904.iam.gserviceaccount.com",
        universe_domain: "googleapis.com",
      }),
    })
  : admin.app();

const dbAdmin = getFirestore();
const AuthAdmin = getAuth(appAdmin);
const timeAdmin = admin.firestore.FieldValue.serverTimestamp();

export { dbAdmin, AuthAdmin, timeAdmin };
