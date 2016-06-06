function silkNav() {

  var drawerTrigger = document.querySelector('.drawer__trigger');
  drawerTrigger.addEventListener('click', triggerDrawer, false);

  function triggerDrawer() {

    document.body.classList.toggle('visible-drawer');

  }

  var nav = document.querySelector('.silk-nav');
  var revertTrigger = document.querySelector('.silk-nav__trigger--revert');
  var reverseTrigger = document.querySelector('.silk-nav__trigger--reverse');
  var nestedNavs = document.querySelectorAll('.silk-nav li ul');
  var history = [];

  revertTrigger.addEventListener('click', startOver, false);
  reverseTrigger.addEventListener('click', goBack, false);

  for (var i = 0; i < nestedNavs.length; i++) {
    var tierTitle = nestedNavs[i].previousSibling.previousSibling;
    var tierTitleClone = document.createElement('a');
    tierTitleClone.setAttribute('href', tierTitle.getAttribute('href'));
    tierTitleClone.innerHTML = tierTitle.innerHTML;
    nestedNavs[i].insertBefore(tierTitleClone, nestedNavs[i].firstChild);

    var advanceTrigger = document.createElement('button');
    advanceTrigger.setAttribute('aria-hidden', 'true');
    advanceTrigger.classList.add('silk-nav__trigger', 'silk-nav__trigger--advance');
    advanceTrigger.innerHTML = '<svg class="symbol symbol-chevron-right"><use xlink:href="#chevron-right"></use></svg>';
    advanceTrigger.addEventListener('click', goForward, false);

    nestedNavs[i].parentNode.insertBefore(advanceTrigger, nestedNavs[i]);
  }

  function startOver() {

    for (var i = 0; i < nestedNavs.length; i++) {
      nestedNavs[i].classList.remove('silk-nav__nest--active')
    }

    history = [];

  }

  function goBack() {

    history[history.length - 1].nextSibling.classList.remove('silk-nav__nest--active');
    history.pop();

  }

  function goForward() {

    if(!(nav.classList.contains('silk-nav--active'))) {
      nav.classList.add('silk-nav--active');
    }

    event.currentTarget.nextSibling.classList.add('silk-nav__nest--active');

    history.push(event.currentTarget);

  }

}
