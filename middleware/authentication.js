
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";

export function authentication(req, res, next) {

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        return res.redirect('/auth/login');
    }
    // Para actualizar cualquier datos del usuario que se registre
    // updateProfile(auth.currentUser, {
    //     displayName: "Cristian F."
    // })
    req.displayName = user.displayName;
    next();

}
