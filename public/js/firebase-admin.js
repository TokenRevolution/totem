// Firebase imports
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, update, remove, push, child } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

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

// Costanti per la gestione della sessione
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minuti in millisecondi
let sessionTimer = null;

// Funzione per gestire il timeout della sessione
function startSessionTimer() {
    if (sessionTimer) {
        clearTimeout(sessionTimer);
    }
    sessionTimer = setTimeout(() => {
        handleLogout();
    }, SESSION_TIMEOUT);
}

// Funzione per resettare il timer della sessione
function resetSessionTimer() {
    startSessionTimer();
}

// Funzione per verificare se l'utente è autenticato
export function isAuthenticated() {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(!!user);
        });
    });
}

// Funzione per ottenere l'utente corrente
export function getCurrentUser() {
    return auth.currentUser;
}

// Funzione per gestire il login
export async function loginAdmin(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('adminEmail', userCredential.user.email);
        startSessionTimer();
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

// Funzione per gestire il logout
export async function handleLogout() {
    try {
        await signOut(auth);
        localStorage.removeItem('adminEmail');
        if (sessionTimer) {
            clearTimeout(sessionTimer);
        }
        window.location.href = 'admin-login.html';
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
}

// Funzione per monitorare lo stato di autenticazione
export function onAuthChange(callback) {
    return onAuthStateChanged(auth, (user) => {
        if (user) {
            startSessionTimer();
            // Aggiungi event listener per il movimento del mouse e la pressione dei tasti
            document.addEventListener('mousemove', resetSessionTimer);
            document.addEventListener('keypress', resetSessionTimer);
        } else {
            if (sessionTimer) {
                clearTimeout(sessionTimer);
            }
            // Rimuovi gli event listener
            document.removeEventListener('mousemove', resetSessionTimer);
            document.removeEventListener('keypress', resetSessionTimer);
        }
        callback(user);
    });
}

// Funzione per verificare i permessi dell'utente
export async function checkUserPermissions() {
    const user = getCurrentUser();
    if (!user) return false;

    try {
        const userRef = ref(db, `users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            const userData = snapshot.val();
            return userData.isAdmin === true;
        }
        return false;
    } catch (error) {
        console.error("Error checking permissions:", error);
        return false;
    }
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