import { useEffect, useState } from 'react';

import axios from 'axios';
import {
	Container,
	Switch,
	withStyles
} from '@material-ui/core';

import Header from './components/Header/Header';
import Definitions from './components/Definitions/Definitions';
import { grey } from '@material-ui/core/colors';

function App() {
	/* Estado de la aplicación */
	const [ meanings, setMeanings ] = useState([]);
	const [ word, setWord ] = useState('');
	const [ category, setCategory ] = useState('es');
	const [ lightMode, setLightMode ] = useState(false);

	/* Switch para cambiar de tema */
	const LightMode = withStyles({
		switchBase: {
			color: grey[300],
			'&$checked': {
				color: grey[500],
			},
			'&$checked + $track': {
				backgroundColor: grey[500],
			},
		},
		checked: {},
		track: {},
	})(Switch);

	/* Consultar la API */
	const dictionaryApi = async () => {
		try {
			const { data } = await axios.get(
				`https://api.dictionaryapi.dev/api/v2/entries/${ category }/${ word }`
			);

			setMeanings(data);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		dictionaryApi();
    /* eslint-disable-next-line */
	}, [category, word]);

	return (
		<div
			style={{
				height: '100vh',
				backgroundColor: lightMode ? '#FFFFFF' : '#282C34',
				color: lightMode ? '#282C34' : '#FFFFFF',
				transition: 'all .3s linear'
			}}
		>
			<Container
				maxWidth="md"
				style={{
					display: 'flex',
					justifyContent: 'space-evenly',
					flexDirection: 'column',
					height: '100vh'
				}}
			>
				<div
					style={{ position: 'absolute', top: 10, right: 15 }}
				>
					<span>{ lightMode ? 'Dark' : 'Light' } Mode</span>
					<LightMode
						checked={ lightMode }
						onChange={ () => setLightMode(!lightMode) }
					/>
				</div>

				<Header
					category={ category }
					word={ word }
					setCategory={ setCategory }
					setWord={ setWord }
					lightMode={ lightMode }
				/>

				{
					meanings && (
						<Definitions
							meanings={ meanings }
							word={ word }
							lightMode={ lightMode }
						/>
					)
				}
			</Container>
		</div>
	);
}

export default App;
