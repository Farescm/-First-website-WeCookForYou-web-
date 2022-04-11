const btns = document.querySelectorAll(".btn-affiche");

for (let n = 0; n < btns.length; n++) {
  btns[n].addEventListener('click', e => {
    const target = e.target.getAttribute('data-target');
    const notTarget = document.querySelectorAll(".Recette:not(" + target + ")");
    for (let i = 0; i < notTarget.length; i++) {
      notTarget[i].style.display = 'none';
    }
    const targets = document.querySelectorAll(".Recette" + target);
    for (let i = 0; i < targets.length; i++) {
      targets[i].style.display = 'flex';
    }
    
  });
}

document.getElementById("Afficher-tous").addEventListener('click', e=> {
  const notTarget = document.querySelectorAll(".Recette");
    for (let i = 0; i < notTarget.length; i++) {
      notTarget[i].style.display = 'flex';
    }
})




