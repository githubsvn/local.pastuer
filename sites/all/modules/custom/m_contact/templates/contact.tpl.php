<?php
$p_settings = variable_get('map_setting', array(
		'address' => '',
		'latitude' => '',
		'longtitude' => '',
	));
$categories = taxonomy_get_tree(10);
?>
<div class="contact-page page">
    <h2 class="page-title1">
        <span class="inner-title">
            <span><?php echo t('Pasteur Institute in Ho Chi Minh City') ?>
            </span>
        </span>
    </h2>
    <div class="contact-content">
        <div class="info">
            <p><span><?php echo t('Address') ?>:</span><?php echo t('167 Pasteur, Ward 8, District 3, Ho Chi Minh City'); ?></p>
            <p><span><?php echo t('Phone'); ?>:</span> (84-8) 38230352</p>
            <p><span><?php echo t('Fax') ?>:</span> (84-8) 38231419</p>
            <form id="contact-form" method="post" action="" class="form-general">
                <h4><?php echo t('Contact Information') ?></h4>
                <div class="form-item form-type-textfield">
                    <label for="name"><?php echo t('Full Name') ?>:</label>
                    <span><span><input id="name" class="input-type-02" type="text" value="" name="name" /></span></span>
                    <span class="require">(&lowast;)</span>
                </div>
                <div class="form-item form-type-textfield">
                    <label for="email"><?php echo t('Email') ?>:</label>
                    <span><span><input id="email" class="input-type-02" type="text" value="" name="email" /></span></span>
                    <span class="require">(&lowast;)</span>
                </div>
                <div class="form-item form-type-textarea">
                    <label for="add-information-contact"><?php echo t('Content') ?>:</label>
                    <span><span><textarea id="message" class="" name="message" cols="" rows="5"></textarea></span></span>
                    <span class="require">(&lowast;)</span>
                </div>
                <div class="form-item form-type-select">
                    <label for="add-information-vacxin"><?php echo t('List of vaccines') ?>:</label>
                    <div class="select-type-03">
                        <span> --- <?php echo t('Please select'); ?> --- </span>
                        <span class="option-btn" title=""></span>
                        <select name="select-vacxin">
                        <?php
                        if(!empty($categories)){
                            foreach($categories as $item)
                            {
                        ?>
                            <option value="<?php echo strtolower($item->name)?>"><?php echo $item->name ?></option>
                       <?php
                            }
                        }
                        ?>
                        </select>
                    </div>
                </div>
                <div class="form-item form-type-button">
                <?php echo drupal_render($form['form_build_id']); ?>
                            <?php echo drupal_render($form['form_token']); ?>
                            <?php echo drupal_render($form['form_id']); ?>
                    <a href="#" title="<?php echo t('Send')?>" class="btn-send"><?php echo t('Send') ?></a>
                    <a href="#" title="<?php echo t('Reset')?>" class="btn-reset"><?php echo t('Reset') ?></a>
                </div>
            </form>
        </div>
        <div class="map">
           </div>
    </div><!-- end contact-content-->
</div>
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
<script type="text/javascript">
    var title = '<?php print $p_settings['address'];?>';
	  var latitude = <?php print $p_settings['latitude'];?>;
	  var longitude = <?php print $p_settings['longtitude'];?>;
</script>
