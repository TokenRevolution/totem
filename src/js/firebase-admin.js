// Firebase imports
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, update, remove, push, child } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyBY79WtkjTgPkY8GqbtZGbawL-PQXjgdHA",
    authDomain: "gestione-totem.firebaseapp.com",
    databaseURL: "https://gestione-totem-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gestione-totem",
    storageBucket: "gestione-totem.firebasestorage.app",
    messagingSenderId: "940742220177",
    appId: "1:940742220177:web:ec36d4958f6f02a948a230",
    measurementId: "G-Y4WT9HRDSY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app);

// Authentication functions
export async function loginAdmin(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

export function onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
}

// Calendar Management
export async function updateCalendarEvent(eventData) {
    try {
        const eventRef = ref(db, `calendar/${eventData.id}`);
        await set(eventRef, {
            ...eventData,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error updating calendar event:", error);
        throw error;
    }
}

export async function deleteCalendarEvent(eventId) {
    try {
        const eventRef = ref(db, `calendar/${eventId}`);
        await remove(eventRef);
    } catch (error) {
        console.error("Error deleting calendar event:", error);
        throw error;
    }
}

export async function exportCalendarData() {
    try {
        const calendarRef = ref(db, 'calendar');
        const snapshot = await get(calendarRef);
        const events = [];
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                events.push({ id: childSnapshot.key, ...childSnapshot.val() });
            });
        }
        return events;
    } catch (error) {
        console.error("Error exporting calendar:", error);
        throw error;
    }
}

// Substitutions Management
export async function updateSubstitution(substitutionData) {
    try {
        const subRef = ref(db, `substitutions/${substitutionData.id}`);
        await set(subRef, {
            ...substitutionData,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error updating substitution:", error);
        throw error;
    }
}

export async function deleteSubstitution(substitutionId) {
    try {
        const subRef = ref(db, `substitutions/${substitutionId}`);
        await remove(subRef);
    } catch (error) {
        console.error("Error deleting substitution:", error);
        throw error;
    }
}

export async function exportSubstitutionsData() {
    try {
        const subsRef = ref(db, 'substitutions');
        const snapshot = await get(subsRef);
        const substitutions = [];
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                substitutions.push({ id: childSnapshot.key, ...childSnapshot.val() });
            });
        }
        return substitutions;
    } catch (error) {
        console.error("Error exporting substitutions:", error);
        throw error;
    }
}

// Organizational Structure Management
export async function updateOrgStructure(structureData) {
    try {
        const structureRef = ref(db, 'organization/structure');
        await set(structureRef, {
            ...structureData,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error updating org structure:", error);
        throw error;
    }
}

export async function getOrgStructure() {
    try {
        const structureRef = ref(db, 'organization/structure');
        const snapshot = await get(structureRef);
        return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
        console.error("Error getting org structure:", error);
        throw error;
    }
} 