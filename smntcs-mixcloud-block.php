<?php
/**
 * Plugin Name:       SMNTCS Mixcloud Block
 * Description:       A simple Gutenberg block to display Mixcloud shows.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0
 * Author:            Niels Lange
 * Author URI:        https://nielslange.de
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       smntcs-mixcloud-block
 *
 * @package SMNTCS_Mixcloud_Block
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

// Define plugin file.
define( 'SMNTCS_MIXCLOUD_BLOCK_PLUGIN_FILE', __FILE__ );
define( 'SMNTCS_MIXCLOUD_BLOCK_PLUGIN_DIR', __DIR__ );

// Include the main class file.
require_once plugin_dir_path( SMNTCS_MIXCLOUD_BLOCK_PLUGIN_FILE ) . 'includes/class-smntcs-mixcloud-block.php';
