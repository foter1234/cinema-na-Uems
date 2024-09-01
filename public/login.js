
document.getElementById('login').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('email').value;
  
    try {
      const response = await fetch('http://localhost:3000/generate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username }),
        credentials: 'include' 
      });
  
      if (!response.ok) {
        throw new Error('sem resposta de rede');
      }
  
      window.location.href = '/home.html';
    } catch (error) {
      console.error('Error:', error);
    }
  });
  