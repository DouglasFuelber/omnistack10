import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        Main,
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no GitHub'
            }
        },
    }, {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#7D40E7'
            },
            headerTitleAlign: 'center',
            headerTintColor: '#FFF',            
            title: 'DevRadar'
        }
    })
);

export default Routes;