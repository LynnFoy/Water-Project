const waterElement = document.getElementById('water');
const remainingLitreText = document.getElementById('remaining-litre');
const percentageText = document.getElementById('percentage');
const smallGlasses = document.querySelectorAll('.small-glass');

let totalLiters = 2; 
let drankLiters = 0;

smallGlasses.forEach((glass) => {
  glass.addEventListener('click', () => {
    const amount = parseInt(glass.getAttribute('data-amount')) / 1000; 

    //Vérifie si le verre est déjà sélectionné
    if (glass.classList.contains('selected')) {
      //Déduire de l'eau si le verre est déjà sélectionné
      glass.classList.remove('selected');
      drankLiters -= amount;
    } else {
      //Ajoute de l'eau si le verre n'est pas encore sélectionné
      glass.classList.add('selected');
      drankLiters += amount;
    }

    //S'assure que les valeurs restent dans les limites 
    drankLiters = Math.max(0, Math.min(drankLiters, totalLiters));

    //Calcule le pourcentage d'eau consommée
    const percentage = (drankLiters / totalLiters) * 100;

    //Mettre à jour l'affichage du grand verre 
    waterElement.style.height = `${percentage}%`;

    //Mettre à jour le texte des litres restants
    const remaining = totalLiters - drankLiters;
    remainingLitreText.textContent = `${remaining.toFixed(2)}L`;

    //Ajuste la position du texte des litres restants dans la partie blanche
    const maxHeight = 50; 
    const moveDistance = (percentage / 100) * maxHeight; 
    remainingLitreText.style.bottom = `${50 + moveDistance}%`; 
    remainingLitreText.style.transform = `translateX(-50%) translateY(50%)`; 

    //Cache le texte des litres restants si l'eau atteint 100%
    if (percentage >= 100) {
      remainingLitreText.classList.add('hidden'); 
    } else {
      //Rendre le texte visible si le pourcentage est inférieur à 100%
      remainingLitreText.classList.remove('hidden'); 
    }

    //Mettre à jour le texte du pourcentage
    percentageText.textContent = `${percentage.toFixed(1)}%`;
  });
});


