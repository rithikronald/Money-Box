import React from "react"
import { StyleSheet, Text,ScrollView,FlatList } from 'react-native';
import { Card} from "native-base";




export default class list extends React.Component{
    
    static navigationOptions ={
        title:"Tracking Page",
        headerStyle:{
            backgroundColor:"#218F76"
        }
    }
    
    
    render(){
        const expList = this.props.navigation.getParam("expenditureList")
        return(
            <ScrollView style={{backgroundColor:"#7CEC9F",flex:1}}>
            <FlatList data={expList}
        keyExtractor={(item,index) => item.time }
        renderItem={({item}) => (
            <Card style={styles.listItem}>
            <Text style={styles.messageText}>{item.value}</Text>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timeText}>{item.time}</Text>
            </Card>
        )}
        >
        </FlatList>
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
   
    listItem: {
      padding: 10,
      
    },
    messageText: {
      fontSize: 20
    },
    timeText: {
      fontSize: 10
    },
    
  });
  