import list from "./screens/list"
import Home from "./screens/Home"
import {createStackNavigator,createAppContainer} from "react-navigation"


const navigator = createStackNavigator({
  Home:{screen: Home},
  list:{screen: list}
})
export default createAppContainer(navigator)
 