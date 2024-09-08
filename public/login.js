import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
document.getElementById('login').addEventListener('submit', async function(event) {
   event.preventDefault()

   const username = document.getElementById('email').value
   const password = document.getElementById('senha').value

   const { data, error } = await supabase.auth.signInWithPassword({
       email: username,
       password: password,
   })

   if (error) {
       alert('Erro ao fazer login: ' + error.message)
       return
   }

   if (data) {
       alert('Login bem-sucedido! Redirecionando...')
       try {
        const response = await fetch('https://servidor-omega.vercel.app/generate-token', {
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
       
   }
})