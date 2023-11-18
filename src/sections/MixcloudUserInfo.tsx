import { __ } from '@wordpress/i18n';

interface MixcloudUserInfoProps {
	showCreatorName: boolean;
	linkCreatorName: boolean;
	mixcloudData: {
		user?: {
			url: string;
			name: string;
		};
	};
}

const MixcloudUserInfo: React.FC< MixcloudUserInfoProps > = ( {
	mixcloudData,
	showCreatorName,
	linkCreatorName,
} ) => (
	<p>
		{ showCreatorName && (
			<>
				{ __( 'by', 'smntcs-mixcloud-block' ) }{ ' ' }
				{ linkCreatorName ? (
					<a href={ mixcloudData?.user?.url }>
						{ mixcloudData?.user?.name }
					</a>
				) : (
					mixcloudData?.user?.name
				) }
			</>
		) }
	</p>
);

export default MixcloudUserInfo;
