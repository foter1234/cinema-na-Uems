// Função para verificar o token
async function checkAuth() {
    try {
      const response = await fetch('http://localhost:3000/verify-token', {
        method: 'GET',
        credentials: 'include' 
      });
  
      if (response.ok) {
        document.getElementById('home').style.display = 'block';
      } else {
        window.location.href = '/index.html'; 
      }
    } catch (error) {
      console.error('Error:', error);
      window.location.href = '/index.html'; 
    }
  }
  checkAuth();

  