<?php
/*
Plugin Name:  Hello world block
Plugin URI: 
Description: Hello world block.
Version: 1.0
Author: 
Author URI: 
*/
add_action('enqueue_block_editor_assets', 'hwb_enqueue_editor_assets', 10 , 1);
add_action('enqueue_block_assets', 'hwb_enqueue_assets', 10 , 1);

function hwb_enqueue_editor_assets() {
  wp_enqueue_script(
    'hwb-block',
    plugins_url('hwb-block.js' , __FILE__ ),
    [  'wp-blocks', 'wp-element', 'wp-components', 'wp-i18n' ]
  );
  wp_enqueue_style(
    'hwb-editor-css',
    plugins_url('editor.css' , __FILE__ ),
    [  'wp-edit-blocks' ]
  );
}

function hwb_enqueue_assets() {
  wp_enqueue_style(
    'hwb-frontend-css',
    plugins_url('styles.css' , __FILE__ ),
    [  'wp-blocks' ]
  );
}
 
