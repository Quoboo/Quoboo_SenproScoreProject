let scores = {
    billiard: { wins: {}, losses: {} },
    dart: { wins: {}, losses: {} }
  };
  
  document.addEventListener('DOMContentLoaded', function() {
    const storedScores = localStorage.getItem('scores');
    if (storedScores) {
      scores = JSON.parse(storedScores);
    }
  
    updateScoreboard();
    resetForm();
  
    document.getElementById('submitBtn').addEventListener('click', function() {
      submitResult();
      resetForm();
    });
  });
  
  function submitResult() {
    const name = document.getElementById('name').value;
    const gameType = document.getElementById('gameType').value;
    const result = document.getElementById('result').value;
  
    if (!name || !gameType || !result) {
      alert('Please fill in all fields');
      return;
    }
  
    if (!scores[gameType].wins[name]) {
      scores[gameType].wins[name] = 0;
    }
  
    if (!scores[gameType].losses[name]) {
      scores[gameType].losses[name] = 0;
    }
  
    if (result === 'win') {
      scores[gameType].wins[name]++;
    } else {
      scores[gameType].losses[name]++;
    }
  
    updateScoreboard();
  }
  
  function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('gameType').value = '';
    document.getElementById('result').value = '';
  }
  
  function updateScoreboard() {
    updateCategoryScores('billiard', 'billiardWinsList', 'wins');
    updateCategoryScores('billiard', 'billiardLossesList', 'losses');
    updateCategoryScores('dart', 'dartWinsList', 'wins');
    updateCategoryScores('dart', 'dartLossesList', 'losses');
  
    localStorage.setItem('scores', JSON.stringify(scores));
  }
  
  function updateCategoryScores(category, listId, scoreType) {
    const scoreList = document.getElementById(listId);
    scoreList.innerHTML = '';
  
    const sortedScores = Object.entries(scores[category][scoreType]).sort((a, b) => {
      return b[1] - a[1];
    });
  
    sortedScores.forEach(([name, score]) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${name}: ${score} ${scoreType === 'wins' ? 'Wins' : 'Losses'}`;
      scoreList.appendChild(listItem);
    });
  }
  