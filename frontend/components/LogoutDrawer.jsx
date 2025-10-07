import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import axios from "axios"
import { Toast } from 'toastify-react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function LogoutDrawer(props) {
    const router = useRouter();

    async function handleLogout() {
        // Clear auth/session here
        // redirect to login screen

        ///token
        const token = await AsyncStorage.getItem("userToken")

        await axios.post("http://192.168.137.1:5000/logout", { withCredentials: true }, {headers: {Authorization: `Bearer ${token}`}}).
            then((res) => {
                if (res.data.status === "ok") {
                    Toast.show({
                        type: "success",
                        text1: res.data.data,
                        useModal: false
                    })
                    router.replace("/");                    
                }
            }).catch((e) => {
                console.log(e)
                Toast.show({
                    type: "success",
                    text1: e,
                    useModal: false
                })
            })
    }

    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
        >
            <View>
                <DrawerItemList {...props} />
            </View>

            <View style={{ marginBottom: 20,flexDirection: "row", alignContent: "center", width: "100%" }}>
                <View style={{position: "absolute", alignSelf: "flex-end", alignItems: "center", right: 10}}>
                    <Pressable onPress={()=> handleLogout()}>
                        <Ionicons name="log-out" color={"red"} size={30} style={{}}/>
                    </Pressable>
                </View>
            </View>
        </DrawerContentScrollView>
    );
}
