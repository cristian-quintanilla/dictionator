import './Definitions.css';

import {
	CardContent,
	Chip,
	Typography,
	makeStyles
} from '@material-ui/core';

const Definitions = ({ meanings, word, lightMode }) => {
	const useStyles = makeStyles({
		title: {
			color: '#000000',
			fontSize: 16,
		},
		pos: {
			color: '#515151',
			fontSize: 14,
		},
	});

	const classes = useStyles();

	return (
		<div className="meanings">
			{
				word === '' ? (
					<span className="subtitle">Comienza escribiendo una palabra...</span>
				) : (
					meanings.map(meaning =>
						meaning.meanings.map(item =>
							item.definitions.map((def, index) => (
								<div
									key={ index }
								 	style={{
										backgroundColor: '#FFF',
										color: '#212121',
										marginBottom: 10,
										borderRadius: 5,
										border: '1px ridge #282C34',
									}}
								>
								<CardContent>
										<Typography className={ classes.title } gutterBottom>
											{ def.definition }
										</Typography>
										{
											def.example && (
												<Typography className={classes.pos} style={{ marginBottom: 16 }}>
													<b>Ejemplo: </b>{ def.example }
												</Typography>
											)
										}
										{
											def.synonyms && (
												<Typography className={classes.pos} style={{ color: '#000000' }}>
													<b>Sinónimos: </b>
													{
														def.synonyms.map((s, i) => (
															<Chip
																key={ i }
																size="small"
																style={{ marginRight: 8, marginBottom: 6 }}
																label={`${s}`}
															/>
														))
													}
												</Typography>
											)
										}
									</CardContent>
								</div>
							))
						)
					)
				)
			}
		</div>
	);
}
 
export default Definitions;
