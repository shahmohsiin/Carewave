import { Stack } from "expo-router";


export default function RootLayout() {
  return (
  
    <Stack>
      <Stack.Screen name="index" options={{title:"",headerShown:true,headerTransparent:true}} />
      <Stack.Screen name="AppointmentsList" options={{title:"",headerShown:true,headerTransparent:true}}/>
      <Stack.Screen name="BloodTestsList" options={{title:"",headerShown:true,headerTransparent:true}}/>
    </Stack>
    
  );
}
