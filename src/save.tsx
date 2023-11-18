/**
 * External dependencies
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

interface props {
	attributes: { label: string; alignment: string };
}

export const Save = ( { attributes }: props ): JSX.Element => {
	return (
		<p { ...useBlockProps.save() }>
			{ __( 'SMTCS Mixcloud Block', 'smntcs-mixcloud-block' ) }
		</p>
	);
};
