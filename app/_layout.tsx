import { Stack } from "expo-router";


export default function RootLayout() {
  return (
  
    <Stack>
      <Stack.Screen name="index" options={{title:"",headerShown:true,headerTransparent:true}} />
      <Stack.Screen name="Appoint" options={{title:"",headerShown:true,headerTransparent:true}}/>
      <Stack.Screen name="pharmacy" options={{title:"",headerShown:true,headerTransparent:true}}/>
      <Stack.Screen name="Test" options={{title:"",headerShown:true,headerTransparent:true}}/>
    </Stack>
    
  );
}
