import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '../../router';
import { useSelector, useDispatch } from "react-redux";
import { authStateChangeUser } from "../../redux/auth/authOperations";

const Main = () => {
    const { stateChange } = useSelector((state) => state.auth)
    const state = useSelector((state) => state.auth)
    
    const dispatch = useDispatch();

    const routing = useRoute(stateChange);
    
    useEffect(() => {
        dispatch(authStateChangeUser())
    }, []);

    return (
    <NavigationContainer >{routing}
      <StatusBar style="auto" />
    </NavigationContainer>
    ) 
}

export default Main;