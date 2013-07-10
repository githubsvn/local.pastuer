<?php

/**
 * @file
 * Displays the search form block.
 *
 * Available variables:
 * - $search_form: The complete search form ready for print.
 * - $search: Associative array of search elements. Can be used to print each
 *   form element separately.
 *
 * Default elements within $search:
 * - $search['search_block_form']: Text input area wrapped in a div.
 * - $search['actions']: Rendered form buttons.
 * - $search['hidden']: Hidden form elements. Used to validate forms when
 *   submitted.
 *
 * Modules can add to the search form, so it is recommended to check for their
 * existence before printing. The default keys will always exist. To check for
 * a module-provided field, use code like this:
 * @code
 *   <?php if (isset($search['extra_field'])): ?>
 *     <div class="extra-field">
 *       <?php print $search['extra_field']; ?>
 *     </div>
 *   <?php endif; ?>
 * @endcode
 *
 * @see template_preprocess_search_block_form()
 */
?>
<?php
	if(!isset($image_path)){
		$image_path = base_path().drupal_get_path('theme','pasteur');
	}
?>

<span class="ui-form input-type-01">
	<input type="text" id="edit-search-block-form--2" name="search_block_form" value="" class="width-type-01" />
	<input type="image" src="<?php print $image_path;?>/transparent.png" value="" class="btn-search" name="" />
</span>
<?php print $search['hidden'];?>

