const userChoiceHandler = async (event) => {
  console.log('test')
    event.preventDefault();

    // Genre
    const genreQuestion = document.querySelector('question').value.trim(); //don't know if I need these
    const genreAnswer = document.querySelector('.choices').value.trim();
    // Decade
    const decadeQuestion = document.querySelector('question').value.trim(); //don't know if I need these
    const decadeAnswer = document.querySelector('.choices').value.trim();
  
    if (genreAnswer && decadeAnswer) {
      console.log(genreAnswer)
      console.log(decadeAnswer)
      const response = await fetch(`/api/questions/choices`, {
        method: 'POST',
        body: JSON.stringify({ genreAnswer, decadeAnswer }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/playlists');
      } else {
        alert('Failed to use option');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/questions/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };

  const genreFormHandler = async (event) => {
    console.log('test')
  }
  
  document
    .querySelector('.submit-choices')
    .addEventListener('click', userChoiceHandler);
  
  document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);