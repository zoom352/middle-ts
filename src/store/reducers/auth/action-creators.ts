import axios from "axios";
import { AppDispatch } from "../..";
import UserService from "../../../Api/UserService";
import { IUser } from "../../../models/IUser";
import { AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction } from "./types";


export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => 
    ({type: AuthActionEnum.SET_USER, payload: user}),

    setIsAuth: (isAuth: boolean): SetAuthAction => 
    ({type: AuthActionEnum.SET_AUTH, payload: isAuth}),

    setIsLoading: (payload: boolean): SetIsLoadingAction =>
    ({type: AuthActionEnum.SET_IS_LOADING, payload}),

    setError: (payload: string): SetErrorAction => 
    ({type: AuthActionEnum.SET_ERROR, payload}),



    login:(username: string, password: string) => async(dispatch: AppDispatch) => {
        try{

            dispatch(AuthActionCreators.setIsLoading(true));

            setTimeout( async () => {
                const response = await UserService.getUsers()
                const mockUser = response.data.find(user => user.username === username && user.password === password)
                console.log(mockUser)
                
            if(mockUser) {
                localStorage.setItem('isAuth', 'true')
                localStorage.setItem('username', mockUser.username)
                dispatch(AuthActionCreators.setUser(mockUser))
                dispatch(AuthActionCreators.setIsAuth(true))
            } else {
                dispatch(AuthActionCreators.setError('password was incorrect'))
            }    
            }, 1000)
            dispatch(AuthActionCreators.setIsLoading(false));
        } catch (e) {
            dispatch(AuthActionCreators.setError('произошла ошибка при логине'))
        }
    },

    logout:() => async (dispatch: AppDispatch) => {       
        localStorage.removeItem('isAuth')
        localStorage.removeItem('username')
        dispatch(AuthActionCreators.setUser({} as IUser))
        dispatch(AuthActionCreators.setIsAuth(false))
    }
}

