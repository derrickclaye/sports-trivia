const api_key = "AIzaSyC_AwHzJfdT_RM_CtIJxv09O8SK5ojdCoY";
const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api_key}`;
const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key}`;

 export const SignUp = async (email, password) => {
    const res = await fetch(signUpUrl,{
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true

        })
    })

    if(res.ok) {
        const { idToken, localId, refreshToken, expiresIn} = await res.json()
        return {
            idToken: idToken,
            localId: localId,
            refreshToken: refreshToken,
            expiresIn: expiresIn
        }
    } else {
        const { error } = await res.json()
        const message = error.message
        throw new Error(message)

    }

}

export const SignIn = async (email, password) => {
    const res = await fetch(signInUrl,{
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true

        })
    })

    if(res.ok) {
        const { idToken, localId, refreshToken, expiresIn} = await res.json()
        return {
            idToken,
            localId,
            refreshToken,
            expiresIn
        }
    } else {
        const { error } = await res.json()
        const message = error.message
        throw new Error(message)

    }

}
