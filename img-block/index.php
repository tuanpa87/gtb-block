<?php
/*
Plugin Name:  Img block
Plugin URI: 
Description: Img block.
Version: 1.0
Author: 
Author URI: 
*/

function img_block_register() {
	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
  }
  
	wp_register_script(
		'img_block_admin_js',
		plugins_url( 'img-block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore' )
	);

	wp_register_style(
		'img_block_editor_style',
		plugins_url( 'editor.css', __FILE__ ),
		array( 'wp-edit-blocks' )
	);

	wp_register_style(
		'img_block_style',
		plugins_url( 'styles.css', __FILE__ ),
		array( )
  );
  
	register_block_type( 'img-block/main', array(
		'style' => 'img_block_style',
		'editor_style' => 'img_block_editor_style',
		'editor_script' => 'img_block_admin_js',
  ) );
}

add_action( 'init', 'img_block_register' );
 
