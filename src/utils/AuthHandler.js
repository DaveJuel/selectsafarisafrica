import { apiKey, fetchEntityData, makeApiRequest } from "./RequestHandler";

export const loginUser = async (username, password) => {
    let isLoggedIn = false;
    const request = {
        api_key: apiKey,
        username,
        password
    };
    const response = await makeApiRequest(`/user/login`, 'POST',request);
    if(response.success){
        localStorage.setItem("user", JSON.stringify(response.result));
        isLoggedIn = true;
    }else{
        throw new Error(response.result ?? 'Failed to authenticate user.');
    }
    return isLoggedIn;
}

export const logoutUser = () => {
    localStorage.removeItem("user");
}

export const isUserLoggedIn = () => {
    const user = localStorage.getItem("user");
    return !!user;
}

export const getLoggedInUser = () => {
    return isUserLoggedIn() ? JSON.parse(localStorage.getItem('user')) : null;
}

export const getLoggedInProfile = async () =>{
    const user = getLoggedInUser();
    if (user) {
       return user.role === 'organization' ?
            await getLoggedInOrganization (user) : 
           await getLoggedInTalent (user);
    } 
}

export const getLoggedInTalent = async (user) => {
    try{
        const data = await fetchEntityData('talents', true);
        return data.success ? data.result.find((item)=>item.email === user.username):null;
    }catch(error){
        console.error(`<getLoggedInTalent> - Failed to get logged in talent.`, error);
    }
}

export const getLoggedInOrganization = async (user) => {
    try{
        const data = await fetchEntityData('organizations', true);
        return data.success ? data.result.find((item)=>item.added_by === user.username):null;
    }catch(error){
        console.error(`<getLoggedInOrganization> - Failed to get logged in organization.`, error);
    }
}