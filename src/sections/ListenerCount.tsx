import { FaUser } from 'react-icons/fa6';

interface ListenerCountProps {
	listenerCount?: number;
}

const ListenerCount: React.FC< ListenerCountProps > = ( { listenerCount } ) => (
	<div className="flex-item">
		<FaUser /> { listenerCount }
	</div>
);

export default ListenerCount;
