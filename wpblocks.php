<?php
/**
 * Plugin Name:       MYWPBLOCKS
 * Description:       2 blocks, one to show your pride, one to paste in youtube share url
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            BadabingBreda
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wpblocks
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

 define( 'WPBLOCKS_VERSION', '1.0.0' );
 define( 'WPBLOCKS_DIR', plugin_dir_path( __FILE__ ) );
 define( 'WPBLOCKS_FILE', __FILE__ );
 define( 'WPBLOCKS_URL', plugins_url( '/', __FILE__ ) );
 
function create_block_elvisblock_block_init() {
	register_block_type( __DIR__ . '/build/pride' );
	register_block_type( __DIR__ . '/build/myyoutube' );
}
add_action( 'init', 'create_block_elvisblock_block_init' );


add_action('wp_enqueue_scripts','enqueue_if_block_is_present');

function enqueue_if_block_is_present(){
  if(is_singular()){
     //We only want the script if it's a singular page
     $id = get_the_ID();
     if(has_block('create-block/myyoutube',$id)){
        wp_enqueue_script('my-awesome-script',WPBLOCKS_URL . 'js/myyoutube.js' ,[] ,WPBLOCKS_VERSION,true);
        wp_enqueue_style( 'my-awesome-script', WPBLOCKS_URL . 'css/myyoutube.css', null, WPBLOCKS_VERSION, 'all' );
     }
  }
}