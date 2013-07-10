<?php

print render($form['form_id']);
print render($form['form_build_id']);
print render($form['form_token']);

?>
<div id="name">
    <?php print render($form['cat_id']); ?>
</div>
<div id="name">
    <?php print render($form['name']); ?>
</div>
<div id="name">
    <?php print render($form['short_des']); ?>
</div>
<div id="name">
    <?php print render($form['des']); ?>
</div>
<div id="name">
    <?php print render($form['image']); ?>
</div>
<div id="name">
    <?php print render($form['published']); ?>
</div>
<?php print render($form['submit']); ?>