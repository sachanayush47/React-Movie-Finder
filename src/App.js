import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {ThemeProvider} from "styled-components"

import Home from './pages/Home';
import Show from './pages/Show';
import Starred from './pages/Starred';

const theme = {
	mainColors: {
	  blue: '#2400ff',
	  gray: '#c6c6c6',
	  dark: '#353535',
	},
};

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/starred" component={Starred}></Route>

				<Route exact path="/show/:id" component={Show}></Route>


                <Route>Error 404</Route>
            </Switch>
		</ThemeProvider>
	);
}

export default App;