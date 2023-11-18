interface MixcloudNameLinkProps {
	linkShowName: boolean;
	mixcloudData: {
		user?: {
			url: string;
		};
		name?: string;
	};
}

const MixcloudNameLink: React.FC< MixcloudNameLinkProps > = ( {
	linkShowName,
	mixcloudData,
} ) => (
	<h2>
		{ linkShowName ? (
			<a href={ mixcloudData?.user?.url }>{ mixcloudData?.name }</a>
		) : (
			mixcloudData?.name
		) }
	</h2>
);

export default MixcloudNameLink;
