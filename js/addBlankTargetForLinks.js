
$(document).ready(function(){
	addBlankTargetForLinks();
});

//外链新窗口打开
function addBlankTargetForLinks () {
  $('a[href^="http"]').each(function(){
		$(this).attr('target', '_blank');
	});
}