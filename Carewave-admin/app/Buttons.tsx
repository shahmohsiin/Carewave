import { View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
import { Link } from 'expo-router';



const Buttons = (props:{Name:String,myUrl:String,myIcon:String}) => {
 
  return (
    
    <View style={{marginTop:10}}>
      
     
      
       <Button style={{height:100,display:"flex",alignContent:"center",justifyContent:"center",width:300,borderRadius:50,marginTop:20}} buttonColor="black" icon={props.myIcon} mode="contained" ><Link style={{fontSize:15}} href={props.myUrl}>{props.Name}</Link></Button>
             
      
  
    </View>
  )

}

export default Buttons;