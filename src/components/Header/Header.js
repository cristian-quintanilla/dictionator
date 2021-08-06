import './Header.css';
import {
	createTheme,
	MenuItem,
	TextField,
	ThemeProvider
} from '@material-ui/core';

import categories from '../../data/category';

const Header = ({ category, word, setCategory, setWord, lightMode }) => {
	const darkTheme = createTheme({
		palette: {
			primary: {
				main: lightMode ? '#282C34' : '#FFFFFF'
			},
			type: lightMode ? 'light' : 'dark',
		},
	});

	return (
		<div className="header">
			<span className="title">
				{ word ? word : 'Dictionator' }
			</span>

			<div className="inputs">
				<ThemeProvider theme={ darkTheme }>
					<TextField
						className="search"
						label="Palabra"
						value={ word }
						onChange={ e => setWord(e.target.value.trim()) }
						variant="outlined"
					/>

					<TextField
						select
						className="select"
						label="Idioma"
						value={ category }
						onChange={ e => setCategory(e.target.value) }
						variant="outlined"
					>
						{
							categories.map(categorie => (
								<MenuItem key={ categorie.label } value={ categorie.label }>
									{ categorie.value }
								</MenuItem>
							))
						}
					</TextField>
				</ThemeProvider>
			</div>
		</div>
	);
}
 
export default Header;
