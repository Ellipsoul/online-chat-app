import React from 'react'
import moment from 'moment'
import { isMobile } from "react-device-detect";

export interface messageProps {
	name: string;
	date: string;
	message: string;
}

export default function Message(props: messageProps) {
	
	const date_moment = !isMobile ? moment(props.date).format('HH:MM:SS  D MMMM YYYY') : moment(props.date).format('HH:MM  D/M');

	return (
		<>
			<section className="message_container">
				<div className="msg_name"> {props.name} </div>
				<div className="msg_date"> {date_moment} </div>
				<div className="msg_message"> {props.message} </div>
			</section>
		</>
	)
}