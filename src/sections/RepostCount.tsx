import { FaRetweet } from 'react-icons/fa6';

interface RepostCountProps {
	repostCount?: number;
}

const RepostCount: React.FC< RepostCountProps > = ( { repostCount } ) => (
	<div className="flex-item">
		<FaRetweet /> { repostCount }
	</div>
);

export default RepostCount;
