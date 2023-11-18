<?php
/**
 * SMNTCS Mixcloud Block class
 */

class SMNTCS_Mixcloud_Block {

	/**
	 * Constructor
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'register_block' ) );
	}

	/**
	 * Register block
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function register_block() {
		register_block_type( SMNTCS_MIXCLOUD_BLOCK_PLUGIN_DIR . '/build' );
	}
}

new SMNTCS_Mixcloud_Block();
