import { FaComment } from 'react-icons/fa6';

interface CommentCountProps {
	commentCount?: number;
}

const CommentCount: React.FC< CommentCountProps > = ( { commentCount } ) => (
	<div className="flex-item">
		<FaComment /> { commentCount }
	</div>
);

export default CommentCount;
