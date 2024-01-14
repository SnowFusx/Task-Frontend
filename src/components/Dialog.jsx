import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useRef, useState } from 'react';

export default function ScrollDialog({ buttonName, contenido, title }) {
	const [open, setOpen] = useState(false);
	const [scroll, setScroll] = useState('paper');

	const handleClickOpen = scrollType => () => {
		setOpen(true);
		setScroll(scrollType);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const descriptionElementRef = useRef(null);
	useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [open]);

	return (
		<React.Fragment>
			<button
				className='text-sky-800 hover:text-sky-950 font-bold text-sm'
				onClick={handleClickOpen('paper')}
			>
				{buttonName}
			</button>
			<Dialog
				open={open}
				onClose={handleClose}
				scroll={scroll}
				aria-labelledby='scroll-dialog-title'
				aria-describedby='scroll-dialog-description'
			>
				<DialogTitle id='scroll-dialog-title'>{title}</DialogTitle>
				<DialogContent dividers={scroll === 'paper'}>
					<DialogContentText
						id='scroll-dialog-description'
						ref={descriptionElementRef}
						tabIndex={-1}
					>
						<div className='dialog-no-x-scroll '>
							{contenido ? contenido : 'No hay nada que mostrar'}
						</div>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cerrar</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
