const userChoiceHandler = async (event) => {
  console.log('test');
  event.preventDefault();

  // Genre
  const genreAnswer = document.querySelector('input[type="radio"][name="question-1"]:checked').value.trim();
  // Decade
  const decadeAnswer = document.querySelector('input[type="radio"][name="question-2"]:checked').value.trim();

  if (genreAnswer && decadeAnswer) {
    console.log(genreAnswer);
    console.log(decadeAnswer);
    const response = await fetch(`/api/questions/choices`, {
      method: 'POST',
      body: JSON.stringify({ genreAnswer, decadeAnswer }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace('/playlists'); //triggers playlist endpoin in htmlroutez
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


document
  .querySelector('form[name="questionForm"]')
  .addEventListener('submit', userChoiceHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
